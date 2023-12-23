const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.post('/update_user_style', styleController.submitUserFeedback);
router.post('/collect_user_nav', styleController.collectUserNav);


module.exports = router;