const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGO_URI || 'mongodb+srv://medhelm_supplies:33524872@medhelm.9lqul7l.mongodb.net/?retryWrites=true&w=majority&appName=Medhelm',
  jwtSecret: process.env.JWT_SECRET || 'Qw8n2kLz5vB1pXy7sT3eR9uJ6hF4cV0aW2zM8qS5tN1bG6dP',
  pesaPal: {
    consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'dq0GHR7+cZoaLe8oonYJUkbok3iKv+yp',
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'wLEg6gVhz+UzUwe9uUjCiC9MVvI=',
    callbackUrl: process.env.PESAPAL_CALLBACK_URL || 'https://medhelmsupplies.co.ke/api/payments/callback',
  },
  email: {
    user: process.env.EMAIL_USER || 'info@medhelmsupplies.co.ke',
    pass: process.env.EMAIL_PASS || 'Texas99$',
  },
};