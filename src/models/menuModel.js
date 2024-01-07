const pool = require('../config/db');

function getRoutes(user_id, callback) {
  const query = `SELECT
  pr.primary_route_id, pr.primary_route_title, pr.primary_route_icon, pr.primary_route_item_order, pr.primary_route_path, pr.primary_route_status,
  c.content_id, c.content_title,
  ct.content_type_title, ct.content_type_key
  FROM primary_route pr
  LEFT JOIN route_content rt ON rt.primary_route_id = pr.primary_route_id
  LEFT JOIN content c ON c.content_id = rt.content_id
  LEFT JOIN content_type ct on ct.content_type_id = c.content_type_id ORDER BY pr.primary_route_item_order`;

  pool.query(query, (error, menuItems) => {
    if (error) {
      return callback(error, null);
    }

    const routeOrderQuery = `SELECT visited_route_id as primary_route_id, route_order as primary_route_item_order FROM user_nav WHERE user_id = ${user_id}`;

    pool.query(routeOrderQuery, (error, routeOrders) => {
      if (error) return callback(error, null)
      return callback(null, updateRouteOrder(menuItems, routeOrders));
    })

  });
}

function updateRouteOrder(routes, routeOrder) {

  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routeOrder.length; j++) {
      if (routes[i].primary_route_id == routeOrder[j].primary_route_id) {
        routes[i].primary_route_item_order = routeOrder[j].primary_route_item_order;
      }
    }
  }
  return routes;
}

module.exports = {
  getRoutes,
};
