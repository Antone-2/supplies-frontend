const axios = require('axios');
const pesaPalConfig = require('./eCommerce-Backend/src/config/pesaPalConfig');

// Test Pesapal checkout session creation (fixed version)
async function testPesapalCheckoutFixed() {
    console.log('🔍 Testing Pesapal checkout session creation (fixed version)...\n');

    // Check configuration
    console.log('📋 Configuration:');
    console.log(`Base URL: ${pesaPalConfig.api.baseUrl}`);
    console.log(`Consumer Key: ${pesaPalConfig.api.consumerKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`Consumer Secret: ${pesaPalConfig.api.consumerSecret ? '✅ Set' : '❌ Missing'}`);
    console.log(`Environment: ${pesaPalConfig.environment}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}\n`);

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

        if (!tokenResponse.data || !tokenResponse.data.token) {
            console.error('❌ Failed to obtain OAuth token');
            return;
        }

        const token = tokenResponse.data.token;
        console.log('✅ OAuth token obtained successfully');

        // Test checkout session creation (without notification_id)
        console.log('🛒 Testing checkout session creation...');

        const pesapalOrder = {
            id: 'test-order-' + Date.now(),
            currency: 'KES',
            amount: 1000,
            description: 'Test Order Payment',
            callback_url: 'http://localhost:5173/checkout',
            billing_address: {
                email_address: 'test@example.com',
                phone_number: '+254712345678',
                country_code: 'KE',
                first_name: 'Test',
                last_name: 'User'
            }
            // Note: notification_id is omitted entirely
        };

        console.log('📤 Sending order payload:', JSON.stringify(pesapalOrder, null, 2));

        const orderResponse = await axios.post(
            pesaPalConfig.api.baseUrl + '/api/Transactions/SubmitOrderRequest',
            pesapalOrder,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.log('✅ Checkout session created successfully!');
        console.log('📋 Response:', orderResponse.data);

        if (orderResponse.data && orderResponse.data.redirect_url) {
            console.log('🎉 Payment URL:', orderResponse.data.redirect_url);
        }

    } catch (error) {
        console.error('❌ Checkout session creation failed:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Response:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }

        // Provide troubleshooting tips
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check if you\'re using sandbox credentials for sandbox environment');
        console.log('2. Verify the order payload format matches Pesapal API documentation');
        console.log('3. Ensure notification_id is omitted for sandbox/development');
        console.log('4. For production, register an IPN URL in Pesapal dashboard and use the IPN ID');
    }
}

// Run the test
testPesapalCheckoutFixed().then(() => {
    console.log('\n🏁 Pesapal checkout test completed');
}).catch((error) => {
    console.error('💥 Test failed with error:', error.message);
});
