const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.post('/update_user_style', styleController.submitUserFeedback);


module.exports = router;