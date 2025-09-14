// Test script to verify conditional notification_id logic
console.log('Testing conditional notification_id logic...');

const NODE_ENV = process.env.NODE_ENV || 'development';
const pesaPalConfig = { payment: { notificationUrl: 'https://example.com/ipn' } };

const pesapalOrderBase = {
    id: 'test',
    currency: 'KES',
    amount: 100,
    description: 'Test Payment',
    callback_url: 'https://example.com/callback',
    billing_address: {
        email_address: 'test@example.com',
        phone_number: '254700000000',
        country_code: 'KE',
        first_name: 'Test',
        last_name: 'User'
    }
};

// Conditionally add notification_id for production only
const pesapalOrder = NODE_ENV === 'production'
    ? { ...pesapalOrderBase, notification_id: pesaPalConfig.payment.notificationUrl }
    : pesapalOrderBase;

console.log('Environment:', NODE_ENV);
console.log('Has notification_id:', pesapalOrder.hasOwnProperty('notification_id'));
console.log('Pesapal Order:', JSON.stringify(pesapalOrder, null, 2));

// Test production scenario
console.log('\n--- Testing Production Scenario ---');
process.env.NODE_ENV = 'production';
const prodOrder = process.env.NODE_ENV === 'production'
    ? { ...pesapalOrderBase, notification_id: pesaPalConfig.payment.notificationUrl }
    : pesapalOrderBase;

console.log('Environment:', process.env.NODE_ENV);
console.log('Has notification_id:', prodOrder.hasOwnProperty('notification_id'));
console.log('Notification URL:', prodOrder.notification_id);
