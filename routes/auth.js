const express = require('express');

//models
const User = require('../models/User');

// controllers
const AuthController = require('../controllers/auth');
const Protection = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults');


const router = express.Router();

router.use('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logout);
router.route('/me').get(advancedResults(User, 'cartItems'), Protection.protect, AuthController.getMe);
router.put('/updatedetails', Protection.protect, AuthController.updateDetails);
router.put('/updatepassword', Protection.protect, AuthController.updatePassword);
router.post('/forgotpassword', AuthController.forgotPassword);
router.post('/login', AuthController.loginUser);
router.put('/resetpassword/:resettoken', AuthController.resetPassword);

module.exports = router;