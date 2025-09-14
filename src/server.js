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

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/review', require('../eCommerce-Backend/src/modules/review/review.routes.js'));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {/* Server started */ });