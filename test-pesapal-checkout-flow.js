require('dotenv').config();
const axios = require('axios');
const pesaPalConfig = require('./eCommerce-Backend/src/config/pesaPalConfig');

// Test the complete Pesapal checkout flow
async function testPesapalCheckoutFlow() {
    console.log('🔄 Testing Complete Pesapal Checkout Flow...\n');

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
        // Step 1: Get OAuth token
        console.log('🔐 Step 1: Getting OAuth token...');
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

        // Step 2: Test checkout session creation (without notification_id)
        console.log('💳 Step 2: Testing checkout session creation...');

        const pesapalOrder = {
            id: 'test-order-' + Date.now(),
            currency: 'KES',
            amount: 1500,
            description: 'Test Order Payment - Medhelm Supplies',
            callback_url: 'http://localhost:5173/checkout?payment_method=pesapal',
            // notification_id field is completely omitted (sandbox mode)
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
            console.log('📝 Order Tracking ID:', orderResponse.data.order_tracking_id);

            // Step 3: Simulate callback URL construction
            console.log('🔄 Step 3: Simulating callback flow...');
            const successCallback = `${pesapalOrder.callback_url}&pesapal_status=success&orderTrackingId=${orderResponse.data.order_tracking_id}`;
            const failedCallback = `${pesapalOrder.callback_url}&pesapal_status=failed&orderTrackingId=${orderResponse.data.order_tracking_id}`;

            console.log('✅ Success callback URL:', successCallback);
            console.log('❌ Failed callback URL:', failedCallback);

            console.log('\n🎯 Flow Summary:');
            console.log('1. User clicks "Pay" button on checkout page');
            console.log('2. Frontend calls backend /orders/create-checkout-session');
            console.log('3. Backend creates order and calls Pesapal API');
            console.log('4. Pesapal returns payment_url');
            console.log('5. Frontend redirects user to Pesapal payment page');
            console.log('6. User completes payment on Pesapal');
            console.log('7. Pesapal redirects back to callback URL with status');
            console.log('8. Frontend handles success/failure and shows appropriate message');

        } else {
            console.error('❌ No redirect URL received from Pesapal');
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
        console.log('5. Try using a default IPN ID for sandbox environment');
    }
}

// Run the test
testPesapalCheckoutFlow().then(() => {
    console.log('\n🏁 Pesapal checkout flow test completed');
}).catch((error) => {
    console.error('💥 Test failed with error:', error.message);
});
