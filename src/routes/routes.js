const express = require('express');
const customerRoutes = require('./customer-routes');
const dynamicGridRoutes = require('./dynamicGrid-routes');
const menuRoutes = require('./menu-routes');
const authRoutes = require('./auth-routes');
const styleRoutes = require('./style_routes')
const router = express.Router();
const appDashboard = require('./app-dashboard-routes');

router.use('/', dynamicGridRoutes);
router.use('/', menuRoutes);
router.use('/', authRoutes);
router.use('/', styleRoutes);
router.use('/', appDashboard);

module.exports = router;