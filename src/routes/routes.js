const express = require('express');
const customerRoutes = require('./customer-routes');
<<<<<<< HEAD
const dynamicGridRoutes = require('./dynamicGrid-routes');
=======
>>>>>>> 51a48c526348877f506881957c0087dea1666080
const menuRoutes = require('./menu-routes');
const router = express.Router();

router.use('/', customerRoutes);
<<<<<<< HEAD
router.use('/', dynamicGridRoutes);
=======
>>>>>>> 51a48c526348877f506881957c0087dea1666080
router.use('/', menuRoutes);

module.exports = router;
