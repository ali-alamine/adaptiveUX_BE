const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.post('/get_routes', styleController.submitUserFeedback);


module.exports = router;