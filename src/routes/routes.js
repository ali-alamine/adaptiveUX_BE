const express = require('express');
const customerRoutes = require('./customer-routes');
const dynamicGridRoutes = require('./dynamicGrid-routes');
const menuRoutes = require('./menu-routes');
const authRoutes = require('./auth-routes');
const router = express.Router();

router.use('/', customerRoutes);
router.use('/', dynamicGridRoutes);
router.use('/', menuRoutes);
router.use('/', authRoutes);

module.exports = router;