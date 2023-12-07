const pool = require('../config/db');


function getDashboardRoutes(req, callback) {

    const getRoutesQuery = `SELECT * FROM primary_route;`;

    pool.query(getRoutesQuery, (error, routes) => {
        if (error) return callback(error, null);

        return callback(null, routes)
    })
}

function addNewRoute(req, callback) {
    let values = [req?.routeTitle, '', req?.routeOrder, req?.routePath, req?.routeStatus];

    const newRouteQuery = `INSERT INTO primary_route (primary_route_title, primary_route_icon, primary_route_item_order, primary_route_path, primary_route_status) values(?,?,?,?,?)`;
    pool.query(newRouteQuery, values, (error, success) => {
        if (error) return callback(error);
        return callback(null, 'route added successfully');
    })
}

function addContent(req, callback) {
    let values = [req.contentTypeID, req.contentTitle];
    const query = `INSERT INTO content (content_type_id, content_title) VALUES(?, ?)`;
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null)
        return callback(null, result)
    })
}

function getContnentType(req, callback) {
    const contentQuery = `SELECT * FROM content_type`;
    pool.query(contentQuery, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function getContnents(req, callback) {
    const contentQuery = `SELECT * FROM content c JOIN content_type ct on c.content_type_id = ct.content_type_id`;
    pool.query(contentQuery, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function linkRouteWithContent(req, callback) {
    const content_id = req.contentID;
    const route_id = req.selectedRouteID;
    const values = [content_id, route_id];

    const query = `INSERT INTO route_content (content_id,primary_route_id) values(? , ?)`;
    pool.query(query, values, (error, success) => {
        if (error) return callback(error, null);
        return callback(null, success);
    })
}

function getRouteContent(req, callback) {
    const query = `SELECT pr.primary_route_title, c.content_title, ct.content_type_title
    FROM route_content rc
    JOIN primary_route pr ON pr.primary_route_id = rc.primary_route_id
    JOIN content c on c.content_id = rc.content_id
    JOIN content_type ct on ct.content_type_id = c.content_type_id`;
    pool.query(query, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function getAttributeTypes(req, callback) {
    const query = `SELECT * FROM attribute_type`;
    pool.query(query, (error, result) => {
        if (error) return callback(error)
        return callback(null, result)
    })
}

function getContentAttributes(req, callback) {
    const content_id = req.contentID;
    const query = `SELECT * FROM attribute a JOIN attribute_type at on a.attr_type_id = at.attr_type_id WHERE a.content_id = ${content_id}`;
    pool.query(query, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function addContentAttr(req, callback) {
    const attr_title = req.attrTitle;
    const attr_key = req.attrKey;
    const attr_type_id = req.attrTypeID;
    const in_form = req.in_form == true ? 1 : 0;
    const in_grid = req.in_grid == true ? 1 : 0;
    const is_hidden = req.is_hidden == true ? 1 : 0;
    const is_sortable = req.is_sortable == true ? 1 : 0;
    const is_filterable = req.is_filterable == true ? 1 : 0;
    const attr_order = req.attr_order;
    const attr_width = req.attr_width;
    const content_id = req.contentID;

    const attr_meta = { "in_form": in_form, "in_grid": in_grid, "is_hidden": is_hidden, "attr_order": attr_order, "attr_width": attr_width, "is_sortable": is_sortable, "is_filterable": is_filterable }
    const query = `INSERT INTO attribute (attr_type_id, content_id, attr_key, attr_title, attr_meta) VALUES (?, ?, ?, ?, ?)`;
    const values = [attr_type_id, content_id, attr_key, attr_title, JSON.stringify(attr_meta)];
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null)
        return callback(null, result)
    })
}

function addAction(req, callback) {
    let values = [req.actionKey, req.actionTitle, req.actionIcon, req.actionDesc]
    const query = `INSERT INTO action (action_key, action_title, action_icon, action_desc) values(?,?,?,?)`;
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null)
        return callback(null, result)
    })
}

function getActions(req, callback) {
    const query = `SELECT * FROM action`;
    pool.query(query, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function addContentAction(req, callback) {
    const content_id = req.contentID;
    const action_id = req.actionID;
    const actionQueries = req.actionQueries.split(';').map(query => query.trim());
    const action_content_query = { 'queries': actionQueries };
    const action_order = req.actionOrder;
    const action_location = req.actionLocation;
    const action_meta = { "order": action_order, "location": action_location };
    let values = [content_id, action_id, JSON.stringify(action_content_query), JSON.stringify(action_meta)];
    const query = `INSERT INTO action_content (content_id, action_id, action_content_query, action_content_meta) values(?, ?, ?, ?)`;

    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function getContentActions(req, callback) {
    const content_id = req.contentID;
    const query = `SELECT a.action_title, a.action_key,ac.action_content_query,c.content_title FROM action a
    JOIN action_content ac on ac.action_id = a.action_id
    JOIN content c on c.content_id = ac.content_id WHERE c.content_id = ${content_id}`;

    pool.query(query, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result);
    })
}

function addAttrConfValue(req, callback) {
    const attr_id = req.attrID;
    const attr_custom_placeholder = req.attrCustomPlaceholder;
    let values = [attr_id, attr_custom_placeholder]
    const query = `INSERT INTO attribute_value (attr_id, attr_custom_placeholder) values (?, ?)`;
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function addAttributeValueOptions(req, callback) {
    const attr_id = req.attrID;
    const attr_value_options = req.attrValueOptions.split(';').map(query => query.trim());

    let attrValueIDQuery = `SELECT attr_value_id FROM attribute_value WHERE attr_id = ${attr_id}`;
    pool.query(attrValueIDQuery, (error, result) => {
        if (error) return callback(error, null);
        let attrValueID;
        // If attribute_value not defined
        if (result.length == 0) {
            const defineValueQuery = `INSERT INTO attribute_value (attr_id) values(?)`;
            pool.query(defineValueQuery, [attr_id], (error, result) => {
                if (error) return callback(error, null);
                attrValueID = result.insertId;
            })
        } else {
            attrValueID = result[0].attr_value_id;
        }

        let values = '';
        let separator;
        for (let i = 0; i < attr_value_options.length; i++) {
            separator = i == attr_value_options.length - 1 ? '' : ','
            values += `(${attrValueID}, '${attr_value_options[i]}', 1) ${separator}`
        }

        const insertAttrValueOptions = `INSERT INTO attribute_value_option (attr_value_id, attr_value_opt_value, attr_value_opt_is_active) VALUES ${values}`;
        pool.query(insertAttrValueOptions, (error, result) => {
            if (error) return callback(error, null);
            return callback(null, result);
        })


    })
}

function addAttributeFetchingConfig(req, callback) {
    const attr_id = req.attrID;
    const fetch_by = req.fetchBy;
    const fetch_value = req.fetch_value;
    const content_attr_ids = req.contentAttrIDs;
    var attr_fetch_value = { "fetch_criteria": { "fetch_by": fetch_by, "fetch_value": fetch_value, "content_attr_ids": content_attr_ids } }
    let attr_value_id;

    pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            return callback(err, null);
        }

        conn.beginTransaction((beginError) => {
            if (beginError) {
                conn.release();
                return callback(beginError, null)
            } else {
                const checkAttrValueIDQuery = `SELECT attr_value_id FROM attribute_value WHERE attr_id = ${attr_id}`;
                conn.query(checkAttrValueIDQuery, (error, result) => {
                    if (error) {
                        conn.release();
                        return callback(error, null);
                    }

                    if (result.length > 0) {
                        attr_value_id = result[0].attr_value_id;
                        const updateFetchByConfQuery = `UPDATE attribute_value SET attr_fetch_value = ? WHERE attr_value_id = ${attr_value_id}`;
                        conn.query(updateFetchByConfQuery, [JSON.stringify(attr_fetch_value)], (error, result) => {
                            if (error) return callback(error, null)
                            return callback(null, result);
                        })

                    } else {

                        const values = [attr_id, JSON.stringify(attr_fetch_value)];
                        const insertFetchByConfQuery = `INSERT INTO attribute_value (attr_id, attr_fetch_value) values( ?, ? )`;

                        conn.query(insertFetchByConfQuery, values, (error, result) => {
                            if (error) {
                                conn.rollback(() => { conn.release(); });
                                return callback(error, null);
                            }

                            return callback(null, result)
                        })
                    }
                })
            }
        })
    })
}

function addContentEvent(req, callback) {
    const content_id = req.contentID;
    // Add event type;
    //  
}

module.exports = {
    getDashboardRoutes,
    addNewRoute,
    getContnentType,
    getContnents,
    linkRouteWithContent,
    getRouteContent,
    getAttributeTypes,
    getContentAttributes,
    addContentAttr,
    addContent,
    addAction,
    getActions,
    addContentAction,
    getContentActions,
    addAttrConfValue,
    addAttributeValueOptions,
};