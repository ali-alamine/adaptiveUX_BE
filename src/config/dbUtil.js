const { getEnteredValue } = require('../shared/helper');

function insertEntity(conn, content_id, callback) {

    const insertEntityQuery = `INSERT INTO entity(content_id, created_at, updated_at) VALUES(?,now(),now())`;
    let values = [content_id];
    conn.query(insertEntityQuery, values, (err, results) => {
        if (err) {
            conn.rollback(() => { conn.release(); });
            return callback(err, null);
        }

        callback(null, results.insertId);
    });

}

function fetchContentAttributes(conn, content_id, callback) {
    const attrIDsQuery = `SELECT attr_id,attr_key from attribute WHERE content_id = '${content_id}'`; // AND JSON_EXTRACT(attr_meta,'$.in_form') = 1
    conn.query(attrIDsQuery, (err, results) => {
        if (err) {
            conn.rollback(() => { conn.release(); });
            return callback(err, null);
        }

        const attributeIDs = results.map(row => row.attr_id);
        callback(null, attributeIDs);
    });
}


function linkEntityWithAttributes(conn, entityID, attributeIDs, callback) {
    const IDs = attributeIDs.map(attrID => [entityID, attrID]);
    const linkEntityAttributeQuery = `INSERT INTO entity_attribute(entity_id, attr_id) values ?`;
    conn.query(linkEntityAttributeQuery, [IDs], (error, result) => {
        if (error) {
            handlePoolConnError(conn, error);
        }
        callback(null);
    });
}

function insertValues(entityID, user_entered_values, conn, callback) {
    let successfulQueries = 0;
    for (let i = 0; i < user_entered_values.length; i++) {
        const insertIntoValuesQuery = `INSERT INTO dy_value (entity_id,attr_id,field_value) values (?,?,?)`;
        let values = [entityID, user_entered_values[i].attr_id, user_entered_values[i].entered_value];

        conn.query(insertIntoValuesQuery, values, (error, result) => {
            if (error) {
                handlePoolConnError(conn, error);
            } else {
                successfulQueries++;

                if (successfulQueries === user_entered_values.length) {
                    callback(null);
                }
            }
        });
    }
}

function applyEvents(conn, content_id, user_entered_values, event_type, callback) {
    const fetchContentEventsQuery = `SELECT * FROM event WHERE content_id = ${content_id} and event_type = '${event_type}'`;
    console.log(fetchContentEventsQuery, "fetchContentEventsQuery")
    conn.query(fetchContentEventsQuery, (error, event_result) => {
        if (error) {
            handlePoolConnError(conn, error);
        } else {
            if (event_result.length > 0) {

                for (let i = 0; i < event_result.length; i++) {
                    let event = event_result[i].event_trigger_criteria.event;

                    // event source
                    let event_source = event.source;
                    let mapping_attr_id = event_source.mapping_attr_id;
                    let to_update_attr_id = event_source.to_update_attr_id;
                    let target_key = event_source.target_key;

                    // event operations
                    let event_operation = event.operations;
                    let target_value = getEnteredValue(user_entered_values, mapping_attr_id, event_type)[target_key];
                    let attempt_query = event_operation.attempt_query;

                    conn.query(attempt_query, [target_value], (error, attempt_result) => {
                        if (error) {
                            handlePoolConnError(conn, error);
                        } else {
                            if (attempt_result.affectedRows == 0 && event_operation.action_query != "") {
                                let action_query = event_operation.action_query;
                                conn.query(action_query, [target_value], (err, action_result) => {
                                    if (error) {
                                        handlePoolConnError(conn, error);
                                    } else {
                                        // last. Commit queries
                                        conn.commit((error) => {
                                            conn.release();
                                            if (error) {
                                                conn.rollback(() => callback(error, null));
                                            } else {
                                                callback(null, "Record added successfully");
                                            }
                                        });
                                    }
                                });
                            } else {
                                // if attempt successful, commit queries
                                conn.commit((error) => {
                                    conn.release();
                                    if (error) {
                                        conn.rollback(() => callback(error, null));
                                    } else {
                                        callback(null, "Record added successfully");
                                    }
                                });
                            }
                        }
                    })
                }

            } else {
                // if no events, commit
                conn.commit((error) => {
                    conn.release();
                    if (error) {
                        conn.rollback(() => callback(error, null));
                    } else {
                        callback(null, "Record added successfully");
                    }
                });


            }
        }
    })
}

function handlePoolConnError(conn, error) {
    conn.rollback((rollbackError) => {
        conn.release();
        return callback(error, null);
    });
}


module.exports = { insertEntity, fetchContentAttributes, linkEntityWithAttributes, insertValues, applyEvents };
