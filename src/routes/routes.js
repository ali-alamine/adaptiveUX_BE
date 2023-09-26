const express = require('express');
const customerRoutes = require('./customer-routes');
const menuRoutes = require('./menu-routes');
const router = express.Router();

router.use('/', customerRoutes);
router.use('/', menuRoutes);

module.exports = router;
