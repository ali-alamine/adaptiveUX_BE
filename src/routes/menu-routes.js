const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/get_menu_items', menuController.getMenuItems);


module.exports = router;