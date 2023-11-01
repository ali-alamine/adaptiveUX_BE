const menuModel = require('../models/menuModel');

<<<<<<< HEAD
function getRoutes(req, res) {
  menuModel.getRoutes((error, results) => {
=======
function getMenuItems(req, res) {
  menuModel.getMenuItems((error, results) => {
>>>>>>> 51a48c526348877f506881957c0087dea1666080
    if (error) {
      console.error('Error executing the query:', error.message);
      res.status(500).send('Error executing the query.');
      return;
    }
    res.json(results);
  });
}

module.exports = {
<<<<<<< HEAD
  getRoutes,
=======
  getMenuItems,
>>>>>>> 51a48c526348877f506881957c0087dea1666080
};
