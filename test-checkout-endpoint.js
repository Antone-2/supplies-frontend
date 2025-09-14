const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testCheckoutEndpoint() {
    console.log('🔍 Testing checkout endpoint...\n');

    try {
        // Step 1: Login to get JWT token
        console.log('🔐 Logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
            email: 'test@example.com',
            password: 'TestPass123!'
        });

        if (!loginResponse.data || !loginResponse.data.token) {
            console.error('❌ Login failed');
            return;
        }

        const token = loginResponse.data.token;
        console.log('✅ Login successful, got JWT token');

        // Step 2: Test checkout endpoint
        console.log('🛒 Testing checkout session creation...');

        const checkoutPayload = {
            amount: 1000,
            description: 'Test Order Payment',
            callback_url: 'http://localhost:5173/checkout',
            email: 'test@example.com',
            phone: '+254712345678',
            orderData: {
                items: [
                    {
                        product: '507f1f77bcf86cd799439011', // Dummy product ID
                        quantity: 1,
                        price: 1000
                    }
                ],
                totalAmount: 1000,
                shippingFee: 0,
                subtotal: 1000,
                shippingAddress: {
                    name: 'Test User',
                    email: 'test@example.com',
                    address: 'Test Address',
                    city: 'Nairobi',
                    country: 'Kenya',
                    phone: '+254712345678',
                    pickupPoint: 'Main Branch'
                }
            }
        };

        const checkoutResponse = await axios.post(
            `${BASE_URL}/api/v1/orders/create-checkout-session`,
            checkoutPayload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Checkout session created successfully!');
        console.log('📋 Response:', checkoutResponse.data);

        if (checkoutResponse.data && checkoutResponse.data.payment_url) {
            console.log('🎉 Payment URL:', checkoutResponse.data.payment_url);
        }

    } catch (error) {
        console.error('❌ Checkout test failed:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Response:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }

        // Provide troubleshooting tips
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Ensure backend server is running on port 5000');
        console.log('2. Check if test user exists and credentials are correct');
        console.log('3. Verify JWT token is valid');
        console.log('4. Check if Pesapal credentials are configured');
        console.log('5. Ensure notification_id is properly handled in sandbox mode');
    }
}

// Run the test
testCheckoutEndpoint().then(() => {
    console.log('\n🏁 Checkout endpoint test completed');
}).catch((error) => {
    console.error('💥 Test failed with error:', error.message);
});
