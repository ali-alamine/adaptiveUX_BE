const pool = require('../config/db');
const EventTypes = require('../config/enums').EventTypes;
const { insertEntity, applyEvents, fetchContentAttributes, linkEntityWithAttributes, insertValues } = require('../config/dbUtil');

function addGridRecord(req, callback) {
    let request = req;
    const content_id = req.contentID;
    const userValues = request.userValues;
    let user_entered_values = [];
    for (let i = 0; i < userValues.length; i++) {
        user_entered_values.push(JSON.parse(userValues[i]));
    }

    pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            return callback(err, null);
        } else {
            conn.beginTransaction((beginErr) => {
                if (beginErr) {
                    conn.release();
                    return callback(beginErr, null);
                }

                // 1. Insert entity
                insertEntity(conn, content_id, (error, entityID) => {
                    if (error) {
                        return callback(error, null);
                    } else {
                        // 2. Fetch content attributes
                        fetchContentAttributes(conn, content_id, (error, attributeIDs) => {
                            if (error) {
                                return callback(error, null);
                            } else {
                                // 3. Link entity with attributes
                                linkEntityWithAttributes(conn, entityID, attributeIDs, (error) => {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        // 4. Insert values
                                        insertValues(entityID, user_entered_values, conn, (error) => {
                                            if (error) {
                                                return callback(error, null);
                                            } else {
                                                // 5. Fetch content events
                                                applyEvents(conn, content_id, user_entered_values, EventTypes.ADD, (error) => {
                                                    if (error) {
                                                        return callback(error, null);
                                                    } else {
                                                        return callback(null, { entity_id: entityID, content_id: content_id });
                                                    }
                                                });
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            });
        }

    });
}

function fetchGridRecords(req, callback) {
    const sort_by = req[0]?.sortBy[0]?.field_key || 'null';
    const sort_type = req[0]?.sortBy[0]?.sort_type || 'ASC';
    const content_id = req[0]?.contentID;
    const queries = req[0]?.queries;

    const fetchAttributes = `SELECT 
    a.*, 
    av.attr_value,av.attr_entered_value,av.attr_value_id, av.attr_fetch_value, av.attr_custom_placeholder,
    atp.attr_type, atp.attr_type_placeholder
    FROM attribute a
    LEFT JOIN attribute_type atp on a.attr_type_id = atp.attr_type_id
    LEFT JOIN attribute_value av on av.attr_id = a.attr_id
    WHERE content_id = '${content_id}' ORDER BY JSON_EXTRACT(attr_meta,'$.attr_order')
    `;

    if (content_id == null) {
        return callback(null, "No attributes found");
    }

    const filterQuery = queries.length > 0
        ? `AND (${queries.map(q => `(a.attr_key = '${q.field_key}' AND dv.field_value LIKE '%${q.query}%')`).join(' AND ')})`
        : 'AND 1=1';

    const fetchGridQuery = `
WITH gridView AS (
    SELECT DISTINCT e.entity_id
    FROM entity e
    JOIN entity_attribute ea ON e.entity_id = ea.entity_id
    JOIN attribute a ON ea.attr_id = a.attr_id
    LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND a.attr_id = dv.attr_id
    WHERE JSON_EXTRACT(a.attr_meta,'$.in_grid') = 1 AND e.content_id = '${content_id}' ${filterQuery}
)
SELECT e.entity_id, 
CASE 
WHEN a.attr_type_id = (SELECT attr_type_id FROM attribute_type WHERE attr_type = 'datalist')
THEN (
    SELECT
    CASE WHEN JSON_VALID(dv.field_value) THEN
        CASE
            WHEN JSON_LENGTH(JSON_EXTRACT(dv.field_value, '$.attr_ids')) = 1 THEN
                (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 0, ']')))
            WHEN JSON_LENGTH(JSON_EXTRACT(dv.field_value, '$.attr_ids')) = 2 THEN
                CONCAT_WS(
                    ' ',
                    (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 0, ']'))),
                    (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 1, ']')))
                )
            WHEN JSON_LENGTH(JSON_EXTRACT(dv.field_value, '$.attr_ids')) = 3 THEN
                CONCAT_WS(
                    ' ',
                    (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 0, ']'))),
                    (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 1, ']'))),
                    (SELECT field_value FROM dy_value WHERE entity_id = JSON_EXTRACT(dv.field_value, '$.entity_id') AND attr_id = JSON_EXTRACT(dv.field_value, CONCAT('$.attr_ids[', 2, ']')))
                )
            ELSE ''
        END
    END
)
ELSE dv.field_value
END AS field_value
,
a.attr_id, a.attr_key, a.attr_title, a.content_id, ea.attr_cell_meta, avo.attr_value_opt_value
FROM gridView gv
JOIN entity e ON gv.entity_id = e.entity_id
JOIN entity_attribute ea ON ea.entity_id = e.entity_id
JOIN attribute a ON ea.attr_id = a.attr_id
LEFT JOIN dy_value dv ON e.entity_id = dv.entity_id AND a.attr_id = dv.attr_id
LEFT JOIN attribute_value_option avo ON
    CASE
        WHEN a.attr_type_id = (SELECT attr_type_id FROM attribute_type WHERE attr_type = 'select') THEN dv.field_value
        ELSE NULL
    END = avo.attr_value_opt_id
    ORDER BY CASE WHEN a.attr_key = '${sort_by}' THEN 0 ELSE 1 END, dv.field_value ${sort_type};
`

    // console.log(fetchGridQuery, ">>> fetchGridQuery <<<")

    pool.query(fetchAttributes, (error, result_attributes) => {
        if (error) return callback(error, null);

        const attrValueIDs = result_attributes.map(row => row.attr_value_id).filter(attrValueIDs => attrValueIDs !== null);
        const fetchAttributeValueOptions = `SELECT * FROM attribute_value_option WHERE attr_value_opt_is_active = 1 AND attr_value_id in (${attrValueIDs.length > 0 ? attrValueIDs.join(',') : '""'})`;

        pool.query(fetchAttributeValueOptions, (error, result_attributeValueOptions) => {
            if (error) return callback(error, null);

            pool.query(fetchGridQuery, (error, result_gridData) => {
                if (error) return callback(error, null);

                // Add attr_value_options to attributes
                for (let i = 0; i < result_attributes.length; i++) {
                    let temp_options = [];
                    for (let j = 0; j < result_attributeValueOptions.length; j++) {
                        if (result_attributes[i]?.attr_value_id === result_attributeValueOptions[j]?.attr_value_id) {
                            temp_options.push(result_attributeValueOptions[j]);
                        }
                    }
                    result_attributes[i].attr_value_options = temp_options;
                }

                const contentActionQuery = `SELECT a.*,ac.action_content_meta FROM action a 
                JOIN action_content ac ON ac.action_id = a.action_id
                JOIN content c ON c.content_id = ac.content_id WHERE c.content_id = ${content_id};`

                pool.query(contentActionQuery, (error, result_contentAction) => {
                    if (error) return callback(error, null);

                    return callback(null, { attributes: result_attributes, content_actions: result_contentAction, gridData: result_gridData, content_id: result_attributes[0]?.content_id || "-999" });
                });

            })
        })
    })
}

function handleAction(req, callback) {
    // console.log(req.record, "req")
    const record = [];
    for (let i = 0; i < req.record.length; i++) {
        record.push(JSON.parse(req.record[i]));
    }
    console.log(record, "record");
    const action_id = req.actionID;
    const content_id = req.contentID;
    const entity_id = req.entityID;
    const getActionQuery = `SELECT a.*,ac.action_content_query,c.content_id,c.content_title FROM action a
    JOIN action_content ac on ac.action_id = a.action_id
    JOIN content c on c.content_id = ac.content_id WHERE c.content_id = ${content_id} AND a.action_id = ${action_id};`;

    pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            return callback(err, null);
        }
        conn.beginTransaction((beginErr) => {
            if (beginErr) {
                conn.release();
                return callback(beginErr, null);
            } else {
                conn.query(getActionQuery, (error, result) => {
                    if (error) {
                        return conn.rollback(() => { { conn.release(); } });
                    }

                    const action_data = result[0];
                    const numberOfQuery = action_data.action_content_query.queries.length;
                    const queries = action_data.action_content_query.queries;
                    let completedQueries = 0;

                    if (action_data.action_id == action_id) {
                        for (const obj of queries) {
                            const key = Object.keys(obj)[0];
                            let query = obj[key];
                            conn.query(query, [entity_id], (error, result) => {
                                if (error) {
                                    conn.rollback(() => { { conn.release(); } });
                                    return callback(error, null);
                                }
                                completedQueries++;

                                if (completedQueries === queries.length) {
                                    applyEvents(conn, content_id, record, EventTypes.DELETE, (error) => {
                                        if (error) {
                                            return callback(error, null);
                                        } else {
                                            conn.commit((commitErr) => {
                                                if (commitErr) {
                                                    conn.rollback(() => { { conn.release(); } });
                                                    return callback(error, null);
                                                } else {
                                                    conn.release();
                                                    callback(null, 'Record delete successfully');
                                                }
                                            });

                                        }
                                    });

                                }

                            });
                        }
                    }
                });
            }
        });
    });


    // pool.query(getActionQuery, (error, result) => {
    //     if (error) return callback(error, null);

    //     const action_data = result[0];
    //     const numberOfQuery = action_data.action_content_query.queries.length;
    //     const queries = action_data.action_content_query.queries;
    //     let completedQueries = 0;

    //     if (action_data.action_id == action_id) {
    //         for (const obj of queries) {
    //             const key = Object.keys(obj)[0];
    //             let query = obj[key];
    //             pool.query(query, [entity_id], (error, result) => {
    //                 if (error) return callback(error, null);
    //                 completedQueries++;

    //                 if (completedQueries === queries.length) {
    //                     callback(null, 'Record delete successfully');
    //                 }

    //             });
    //         }
    //     }
    // });
}


function fetchAttributeValue(req, callback) {
    const data = JSON.parse(req.data);
    const results = [];
    let completedQueries = 0;

    const query = `
        SELECT e.entity_id, a.attr_key, a.attr_id, dv.field_value
        FROM entity e
        JOIN entity_attribute ea ON ea.entity_id = e.entity_id
        JOIN attribute a ON a.attr_id = ea.attr_id 
        JOIN dy_value dv ON dv.entity_id = e.entity_id AND a.attr_id = dv.attr_id
        WHERE e.${data[0]?.fetch_by} = ?  AND a.attr_id in (?);
    `;

    for (const item of data) {
        pool.query(query, [item.fetch_value, item.content_attr_ids], (error, rows) => {
            if (error) {
                callback(error, null);
            } else {
                results.push({ [item.fetch_by]: item.fetch_value, attr_values: rows });

                completedQueries++;
                if (completedQueries === data.length) {
                    callback(null, results);
                }
            }
        });
    }
}


module.exports = {
    addGridRecord,
    fetchGridRecords,
    fetchAttributeValue,
    handleAction,

}
