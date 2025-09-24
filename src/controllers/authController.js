// Password reset request handler
async function requestPasswordReset(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with that email' });
        }
        // Generate reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const frontendUrl = process.env.FRONTEND_URL || 'https://medhelmsupplies.co.ke';
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;
        // Send reset email
        await sendEmail(
            user.email,
            'Reset your Medhelm Supplies password',
            `<p>You requested a password reset.</p><p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
        );
        res.json({ message: 'Password reset email sent. Please check your inbox.' });
    } catch (err) {
        console.error('requestPasswordReset error:', err);
        res.status(500).json({ error: 'Failed to send password reset email', details: err.message });
    }
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const User = require('../../Database/models/user.model');

const sendEmail = require('../utils/emailService');

async function registerUser(req, res) {
    try {
        // ...existing code...
        const { username, email, password, firstName, lastName } = req.body;

        if (!username || !email || !password) {
            // ...existing code...
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Password strength validation
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!strongPassword.test(password)) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            });
        }

        // Check if user already exists
        const existing = await User.findOne({ email });
        // ...existing code...
        if (existing) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // ...existing code...

        // Use 'name' field for User model
        const name = firstName && lastName ? `${firstName} ${lastName}` : username;

        // Save to database with all expected fields
        const user = await User.create({
            name,
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verified: false,
            isVerified: false
        });
        // Ensure both fields are always in sync
        if (user.verified !== user.isVerified) {
            user.verified = user.isVerified = user.verified || user.isVerified;
            await user.save();
        }

        // Generate verification token
        const verifyToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const frontendUrl = process.env.FRONTEND_URL || 'https://medhelmsupplies.co.ke';
        const verifyLink = `${frontendUrl}/verify-email?token=${verifyToken}`;

        // Send verification email
        await sendEmail(
            user.email,
            'Verify your Medhelm Supplies account',
            `<p>Welcome to Medhelm Supplies!</p><p>Please verify your account by clicking the link below:</p><a href="${verifyLink}">${verifyLink}</a>`
        );

        res.status(201).json({
            message: 'User registered successfully. Please check your email to verify your account.',
            user: {
                name: user.name,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                verified: user.verified,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        console.error('registerUser error:', err);
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
}

async function loginUser(req, res) {
    try {
        // ...existing code...
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        // ...existing code...
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        // ...existing code...
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if user is verified (support both fields for test compatibility)
        // If either is true, allow login
        if (!(user.verified || user.isVerified)) {
            // ...existing code...
            // Test expects 400 for unverified user
            return res.status(400).json({ error: 'Please verify your email before logging in.' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // ...existing code...

        res.json({
            token,
            user: {
                name: user.name,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                verified: user.verified,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        console.error('loginUser error:', err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    requestPasswordReset,
    verifyEmail: async (req, res) => {
        try {
            const { token } = req.body.token ? req.body : req.query;
            if (!token) return res.status(400).json({ error: 'Token is required' });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            user.verified = user.isVerified = true;
            await user.save();
            res.json({ message: 'Email verified successfully.' });
        } catch (err) {
            res.status(400).json({ error: 'Invalid or expired token', details: err.message });
        }
    },
    register: registerUser,
    login: loginUser
};
