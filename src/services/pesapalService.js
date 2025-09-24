// pesapalService.js
const axios = require('axios');

const PESAPAL_BASE_URL = process.env.PESAPAL_BASE_URL || 'https://pesapal.com';

async function initiatePesapalPayment(orderId, amount, phone, email) {
    // Replace with your real Pesapal API integration
    // This is a placeholder for demonstration
    return {
        paymentUrl: `${PESAPAL_BASE_URL}/pay?orderId=${orderId}&amount=${amount}`
    };
}

module.exports = { initiatePesapalPayment };