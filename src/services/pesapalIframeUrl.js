// pesapalIframeUrl.js
const PESAPAL_IFRAME_BASE_URL = process.env.PESAPAL_IFRAME_BASE_URL || 'https://www.pesapal.com/iframe';

function getPesapalIframeUrl(orderId, amount) {
    // Replace with your real Pesapal iframe URL logic
    return `${PESAPAL_IFRAME_BASE_URL}/?orderId=${orderId}&amount=${amount}`;
}

module.exports = { getPesapalIframeUrl };