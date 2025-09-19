// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../modules/auth/auth.controller');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/signup', authController.register); // alias for frontend compatibility

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', auth, authController.me);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email', authController.verifyEmail);





module.exports = router;
