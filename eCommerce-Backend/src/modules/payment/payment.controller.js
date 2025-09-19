// payment.controller.js
// Express payment controller template for MPESA, Pesapal, and PayPal

const axios = require('axios');

// Create payment (Pesapal/Card/Bank)
// REAL PESAPAL INTEGRATION (OAuth1, REST API)
const crypto = require('crypto');
const qs = require('querystring');

function getPesapalBaseUrl() {
    return process.env.PESAPAL_BASE_URL || 'https://sandbox. pesapal.com/api/Transactions/';
}

function getPesapalCredentials() {
    return {
        key: process.env.PESAPAL_CONSUMER_KEY,
        secret: process.env.PESAPAL_CONSUMER_SECRET,
    };
}

function generateOauthSignature(method, url, params, consumerSecret) {
    // Pesapal uses OAuth1.0a HMAC-SHA1
    const sorted = Object.keys(params).sort().map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
    const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(sorted)}`;
    const signingKey = `${encodeURIComponent(consumerSecret)}&`;
    return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
}

exports.createPesapalPayment = async (req, res) => {
    try {
        const { amount, currency = 'KES', description = 'Order Payment', callback_url, notification_id, billing_phone, billing_email } = req.body;
        const { key, secret } = getPesapalCredentials();
        const baseUrl = getPesapalBaseUrl();
        if (!key || !secret) return res.status(500).json({ message: 'Pesapal credentials missing' });

        // Pesapal OAuth1 params
        const oauthParams = {
            oauth_consumer_key: key,
            oauth_nonce: crypto.randomBytes(8).toString('hex'),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
            oauth_version: '1.0',
        };
        // Payment params
        const paymentParams = {
            Amount: amount,
            Currency: currency,
            Description: description,
            Type: 'MERCHANT',
            Reference: notification_id || `order-${Date.now()}`,
            PhoneNumber: billing_phone || '',
            Email: billing_email || '',
            CallbackURL: callback_url || process.env.PESAPAL_CALLBACK_URL || '',
        };
        const allParams = { ...oauthParams, ...paymentParams };
        const signature = generateOauthSignature('POST', baseUrl + 'PostPesapalDirectOrderV4', allParams, secret);

        // Build OAuth1 header
        const oauthHeader =
            `OAuth oauth_consumer_key="${key}",oauth_signature_method="HMAC-SHA1",oauth_signature="${encodeURIComponent(signature)}",oauth_timestamp="${oauthParams.oauth_timestamp}",oauth_nonce="${oauthParams.oauth_nonce}",oauth_version="1.0"`;

        // Pesapal expects x-www-form-urlencoded
        const pesapalUrl = baseUrl + 'PostPesapalDirectOrderV4';
        const formBody = qs.stringify(paymentParams);
        const pesapalRes = await axios.post(pesapalUrl, formBody, {
            headers: {
                'Authorization': oauthHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // Pesapal returns OrderTrackingId or payment URL
        res.json({ pesapal: pesapalRes.data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to initiate Pesapal payment', details: err.message });
    }
};

// MPESA payment
exports.payWithMpesa = async (req, res) => {
    try {
        // Example: send payment request to MPESA API
        // Replace with your real MPESA integration
        const { phone, pin, amount, orderId } = req.body;
        // Simulate success
        res.json({ message: 'MPESA payment successful', orderId });
    } catch (err) {
        res.status(500).json({ message: 'MPESA payment failed' });
    }
};

// Airtel Money payment
exports.payWithAirtel = async (req, res) => {
    try {
        // Example: send payment request to Airtel API
        const { phone, pin, amount, orderId } = req.body;
        // Simulate success
        res.json({ message: 'Airtel Money payment successful', orderId });
    } catch (err) {
        res.status(500).json({ message: 'Airtel Money payment failed' });
    }
};

// PayPal payment (simulate)
exports.payWithPaypal = async (req, res) => {
    try {
        // Example: send payment request to PayPal API
        const { orderId, amount, email } = req.body;
        // Simulate success
        res.json({ message: 'PayPal payment successful', orderId });
    } catch (err) {
        res.status(500).json({ message: 'PayPal payment failed' });
    }
};

// Payment callback/confirmation (Pesapal, MPESA, etc.)
exports.paymentCallback = async (req, res) => {
    try {
        // Handle payment provider callback/confirmation here
        // Update order status, etc.
        res.json({ message: 'Payment callback received' });
    } catch (err) {
        res.status(500).json({ message: 'Payment callback failed' });
    }
};