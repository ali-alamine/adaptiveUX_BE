const pool = require('../config/db');

function getRoutes(callback) {
  const query = `SELECT
  pr.primary_route_id, pr.primary_route_title, pr.primary_route_icon, pr.primary_route_item_order, pr.primary_route_path, pr.primary_route_status,
  c.content_id, c.content_title,
  ct.content_type_title,ct.content_type_key
  FROM primary_route pr
  left JOIN route_content rt ON rt.primary_route_id = pr.primary_route_id
  left JOIN content c ON c.content_id = rt.content_id
  left JOIN content_type ct on ct.content_type_id = c.content_type_id`;

  pool.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  getRoutes,
};
