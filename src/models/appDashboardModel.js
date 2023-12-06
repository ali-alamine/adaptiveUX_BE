const pool = require('../config/db');


function getDashboardRoutes(req, callback) {
    // const getRoutesQuery = `SELECT
    // pr.primary_route_id, pr.primary_route_title, pr.primary_route_icon, pr.primary_route_item_order, pr.primary_route_path, pr.primary_route_status,
    // c.content_id, c.content_title,
    // ct.content_type_title,ct.content_type_key
    // FROM primary_route pr
    // left JOIN route_content rt ON rt.primary_route_id = pr.primary_route_id
    // left JOIN content c ON c.content_id = rt.content_id
    // left JOIN content_type ct on ct.content_type_id = c.content_type_id`;

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

    const query = `INSERT INTO route_content (primary_route_id,content_id) values(? , ?)`;
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
    const query = `SELECT * FROM attribute WHERE content_id = ${content_id}`;
    pool.query(query, (error, result) => {
        if (error) return callback(error, null);
        return callback(null, result)
    })
}

function addContentAttr(req, callback) {
    const attr_title = req.attrTitle;
    const attr_key = req.attrKey;
    const attr_type_id = req.attrTypeID;
    const in_form = req.in_form;
    const in_grid = req.in_grid;
    const is_hidden = req.is_hidden;
    const is_sortable = req.is_sortable;
    const is_filterable = req.is_filterable;
    const attr_order = req.attr_order;
    const attr_width = req.attr_width;
    const content_id = req.contentID

    const attr_meta = { "in_form": in_form, "in_grid": in_grid, "is_hidden": is_hidden, "attr_order": attr_order, "attr_width": attr_width, "is_sortable": is_sortable, "is_filterable": is_filterable }
    const query = `INSERT INTO attribute (attr_type_id, content_id, attr_key, attr_title, attr_meta) VALUES (?, ?, ?, ?, ?)`;
    const values = [attr_type_id, content_id, attr_key, attr_title, JSON.stringify(attr_meta)];
    pool.query(query, values, (error, result) => {
        if (error) return callback(error, null)
        return callback(null, result)
    })
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
};