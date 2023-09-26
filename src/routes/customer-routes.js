const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/filter_customers', customerController.getCustomers);
router.delete('/delete_customer', customerController.deleteCustomer);
router.get('/pin_customer', customerController.pinCustomer);
router.get('/unpin_customer', customerController.unPinCustomer);
router.post('/add_customer', customerController.addCustomer);

module.exports = router;
