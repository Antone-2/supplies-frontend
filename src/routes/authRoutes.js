import express from 'express';
import {
    register,
    verifyEmail,
    login,
    authenticateToken
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);

// Example protected route
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected profile route', user: req.user });
});

export default router;
