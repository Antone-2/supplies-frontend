const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

// GET /api/users/profile - Get logged-in user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};

// PUT /api/users/profile - Update logged-in user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (email) user.email = email;

        if (password) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};

// POST /api/users/register - Register new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'customer',
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
            expiresIn: config.JWT_EXPIRES_IN || '1h',
        });

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Server error registering user' });
    }
};

// POST /api/users/login - Authenticate user & issue token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
            expiresIn: config.JWT_EXPIRES_IN || '1h',
        });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: 'Server error logging in' });
    }
};