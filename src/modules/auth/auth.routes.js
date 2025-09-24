const express = require('express');
const router = express.Router();
const passport = require('../../config/passport'); // Adjust path as needed
const authController = require('./auth.controller');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/auth' }),
    authController.googleCallback
);

// Example: Protected route (JWT)
const authenticateJWT = passport.authenticate('jwt', { session: false });
router.get('/me', authenticateJWT, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = router;