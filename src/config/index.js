const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/medhelm',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  pesaPal: {
    consumerKey: process.env.PESAPAL_CONSUMER_KEY || '',
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || '',
    callbackUrl: process.env.PESAPAL_CALLBACK_URL || 'http://localhost:5000/api/payment/callback',
  },
  email: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};