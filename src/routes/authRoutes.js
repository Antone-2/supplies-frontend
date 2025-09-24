// Converted to CommonJS for compatibility with server.js require()
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.loginUser);
router.post('/reset-password-request', authController.requestPasswordReset);

// Protected profile example
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected profile route', user: req.user });
});

module.exports = router;
