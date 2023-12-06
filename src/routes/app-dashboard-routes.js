const express = require('express');
const router = express.Router();
const appDashboardController = require('../controllers/appDashboardController')

router.get('/get_dashboard_routes', appDashboardController.getDashboardRoutes);
router.post('/add_new_route', appDashboardController.addNewRoute);
router.get('/get_content_type', appDashboardController.getContnentType);
router.get('/get_contents', appDashboardController.getContnents);
router.post('/link_route_with_content', appDashboardController.linkRouteWithContent);
router.get('/get_route_content', appDashboardController.getRouteContent);
router.get('/get_attr_types', appDashboardController.getAttributeTypes);
router.get('/get_content_attr', appDashboardController.getContentAttributes);
router.post('/add_content_attr', appDashboardController.addContentAttr);


module.exports = router;