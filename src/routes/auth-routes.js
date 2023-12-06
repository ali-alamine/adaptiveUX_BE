const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get('/get_user_role', authController.getUserRoles);

router.post('/signUp', authController.signUp);

module.exports = router;