const express = require('express');
const router = express.Router();
const appDashboardController = require('../controllers/appDashboardController')

router.get('/get_dashboard_routes', appDashboardController.getDashboardRoutes);
router.post('/add_new_route', appDashboardController.addNewRoute);
router.post('/add_new_content', appDashboardController.addContent);
router.get('/get_content_type', appDashboardController.getContnentType);
router.get('/get_contents', appDashboardController.getContnents);
router.post('/link_route_with_content', appDashboardController.linkRouteWithContent);
router.get('/get_route_content', appDashboardController.getRouteContent);
router.get('/get_attr_types', appDashboardController.getAttributeTypes);
router.get('/get_content_attr', appDashboardController.getContentAttributes);
router.post('/add_content_attr', appDashboardController.addContentAttr);
router.post('/add_action', appDashboardController.addAction);
router.get('/get_actions', appDashboardController.getActions);
router.post('/add_action_content', appDashboardController.addContentAction);
router.get('/get_content_actions', appDashboardController.getContentActions);
router.post('/add_attr_value_conf', appDashboardController.addAttrConfValue);
router.post('/add_attr_value_options', appDashboardController.addAttributeValueOptions);

module.exports = router;