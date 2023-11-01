const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

<<<<<<< HEAD
router.get('/get_routes', menuController.getRoutes);
=======
router.get('/get_menu_items', menuController.getMenuItems);
>>>>>>> 51a48c526348877f506881957c0087dea1666080


module.exports = router;