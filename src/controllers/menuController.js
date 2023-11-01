const menuModel = require('../models/menuModel');

function getRoutes(req, res) {
  menuModel.getRoutes((error, results) => {
    if (error) {
      console.error('Error executing the query:', error.message);
      res.status(500).send('Error executing the query.');
      return;
    }
    res.json(results);
  });
}

module.exports = {
  getRoutes,
};
