require('dotenv').config();
const axios = require('axios');
const pesaPalConfig = require('./eCommerce-Backend/src/config/pesaPalConfig');

// Test Pesapal checkout session creation with notification_id set to null
async function testPesapalCheckout() {
    console.log('🔍 Testing Pesapal checkout session creation (notification_id = null)...\n');

    // Check configuration
    console.log('📋 Configuration:');
    console.log(`Base URL: ${pesaPalConfig.api.baseUrl}`);
    console.log(`Consumer Key: ${pesaPalConfig.api.consumerKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`Consumer Secret: ${pesaPalConfig.api.consumerSecret ? '✅ Set' : '❌ Missing'}`);
    console.log(`Environment: ${pesaPalConfig.environment}\n`);

    // Validate configuration
    if (!pesaPalConfig.validateConfig()) {
        console.error('❌ Configuration validation failed. Please check your environment variables.');
        return;
    }

    try {
        // Get OAuth token
        console.log('🔐 Getting OAuth token...');
        const tokenResponse = await axios.post(pesaPalConfig.api.baseUrl + '/api/Auth/RequestToken', {
            consumer_key: pesaPalConfig.api.consumerKey,
            consumer_secret: pesaPalConfig.api.consumerSecret
        });

        if (!tokenResponse.data.token) {
            console.error('❌ Failed to obtain OAuth token');
            return;
        }

        const token = tokenResponse.data.token;
        console.log('✅ OAuth token obtained successfully');

        // Test checkout session creation with notification_id = null
        console.log('💳 Testing checkout session creation...');

        const pesapalOrder = {
            id: 'test-order-' + Date.now(),
            currency: 'KES',
            amount: 1000,
            description: 'Test Order Payment',
            callback_url: pesaPalConfig.payment.callbackUrl || 'http://localhost:5173/checkout',
            notification_id: null, // Explicitly set to null
            billing_address: {
                email_address: 'test@example.com',
                phone_number: '+254700000000',
                country_code: 'KE',
                first_name: 'Test',
                last_name: 'User'
            }
        };

        console.log('📤 Sending order data:', JSON.stringify(pesapalOrder, null, 2));

        const orderResponse = await axios.post(
            pesaPalConfig.api.baseUrl + '/api/Transactions/SubmitOrderRequest',
            pesapalOrder,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.log('✅ Checkout session created successfully!');
        console.log('📋 Response:', JSON.stringify(orderResponse.data, null, 2));

        if (orderResponse.data.redirect_url) {
            console.log('🔗 Payment URL:', orderResponse.data.redirect_url);
        }

    } catch (error) {
        console.error('❌ Checkout session creation failed:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }

        // Provide troubleshooting tips
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Verify callback_url is accessible');
        console.log('2. Ensure Pesapal credentials are correct');
        console.log('3. Check if you\'re using sandbox or live environment appropriately');
        console.log('4. For production, register IPN URL with Pesapal and use the returned ID');
        console.log('5. Try omitting notification_id field entirely');
    }
}

// Run the test
testPesapalCheckout().then(() => {
    console.log('\n🏁 Pesapal checkout test completed');
}).catch((error) => {
    console.error('💥 Test failed with error:', error.message);
});
