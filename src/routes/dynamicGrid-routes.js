const express = require('express');
const router = express.Router();
const dynamicGridController = require('../controllers/dynamicGridController');

router.post('/add_dynamicGrid_record', dynamicGridController.addGridRecord);
router.post('/get_grid_data', dynamicGridController.fetchGridRecords);
// router.delete('/delete_record', dynamicGridController.deleteRecord);
router.post('/delete_record', dynamicGridController.handleAction);
router.post('/get_attr_values', dynamicGridController.fetchAttributeValue);

module.exports = router;

