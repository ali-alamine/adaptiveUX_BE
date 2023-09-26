const pool = require('../config/db');

function getMenuItems(callback) {
  const query = 'SELECT * FROM main_menu_items ORDER BY order_num';
  pool.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

module.exports = {
  getMenuItems,
};
