// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health endpoints (unversioned + versioned)
app.get('/api/health', (_req, res) => res.json({ status: 'ok', versioned: false }));
app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok', versioned: true }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/review', require('../eCommerce-Backend/src/modules/review/review.routes.js'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Versioned routes (/api/v1/*) to match frontend VITE_API_URL
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/cart', require('./routes/cartRoutes'));
app.use('/api/v1/review', require('../eCommerce-Backend/src/modules/review/review.routes.js'));
app.use('/api/v1/orders', require('./routes/orderRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/v1/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/v1/contact', require('./routes/contactRoutes'));

// 404 handler for API paths
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Not Found', path: req.path });
    }
    next();
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {/* Server started */ });