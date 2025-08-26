// Pesapal Configuration
const pesaPalConfig = {
  // API Configuration
  api: {
    baseUrl: process.env.PESAPAL_BASE_URL || 'https://pay.pesapal.com/v3',
    consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'your-consumer-key',
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'your-consumer-secret',
    apiKey: process.env.PESAPAL_API_KEY || 'your-api-key',
    apiSecret: process.env.PESAPAL_API_SECRET || 'your-api-secret'
  },

  // Payment Configuration
  payment: {
    currency: 'KES',
    country: 'KE',
    callbackUrl: process.env.PESAPAL_CALLBACK_URL || 'http://localhost:3000/payment/callback',
    notificationUrl: process.env.PESAPAL_NOTIFICATION_URL || 'http://localhost:3000/payment/notification',
    redirectUrl: process.env.PESAPAL_REDIRECT_URL || 'http://localhost:3000/payment/success'
  },

  // Order Configuration
  order: {
    defaultDescription: 'Medhelm Supplies Order',
    timeout: 3600, // 1 hour in seconds
    retries: 3
  },

  // Environment
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox'
};

module.exports = pesaPalConfig;
