require('dotenv').config();

console.log('=== Pesapal Environment Variables Check ===');
console.log('PESAPAL_CONSUMER_KEY:', process.env.PESAPAL_CONSUMER_KEY ? '✅ Set' : '❌ Not set');
console.log('PESAPAL_CONSUMER_SECRET:', process.env.PESAPAL_CONSUMER_SECRET ? '✅ Set' : '❌ Not set');
console.log('PESAPAL_BASE_URL:', process.env.PESAPAL_BASE_URL || 'Using default: https://pay.pesapal.com/v3');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set');
console.log('BACKEND_URL:', process.env.BACKEND_URL || 'Not set');

// Test pesaPalConfig
try {
    const pesaPalConfig = require('./eCommerce-Backend/src/config/pesaPalConfig.js');
    console.log('\n=== Pesapal Config Validation ===');
    console.log('Config valid:', pesaPalConfig.validateConfig());
    console.log('Consumer Key:', pesaPalConfig.api.consumerKey ? '✅ Set' : '❌ Not set');
    console.log('Consumer Secret:', pesaPalConfig.api.consumerSecret ? '✅ Set' : '❌ Not set');
    console.log('Base URL:', pesaPalConfig.api.baseUrl);
    console.log('Environment:', pesaPalConfig.environment);
} catch (error) {
    console.error('Error loading pesaPalConfig:', error.message);
}
