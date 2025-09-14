require('dotenv').config();
const axios = require('axios');
const pesaPalConfig = require('./eCommerce-Backend/src/config/pesaPalConfig');

// Test Pesapal API connectivity
async function testPesapalConnection() {
    console.log('🔍 Testing Pesapal API connection...\n');

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
        // Test 1: Get OAuth token
        console.log('🔐 Testing OAuth token request...');
        const tokenResponse = await axios.post(pesaPalConfig.api.baseUrl + '/api/Auth/RequestToken', {
            consumer_key: pesaPalConfig.api.consumerKey,
            consumer_secret: pesaPalConfig.api.consumerSecret
        });

        if (tokenResponse.data && tokenResponse.data.token) {
            console.log('✅ OAuth token obtained successfully');
            const token = tokenResponse.data.token;

            // Test 2: Test a simple API call (you might need to adjust this based on Pesapal's API)
            console.log('🔍 Testing API connectivity...');
            try {
                // This is a placeholder - you might need to use a different endpoint
                const testResponse = await axios.get(pesaPalConfig.api.baseUrl + '/api/some-test-endpoint', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('✅ API connectivity test successful');
            } catch (apiError) {
                console.log('⚠️  API test endpoint not available, but token is valid');
                console.log('   This is normal if the test endpoint doesn\'t exist');
            }

        } else {
            console.error('❌ Failed to obtain OAuth token');
            console.error('Response:', tokenResponse.data);
        }

    } catch (error) {
        console.error('❌ Pesapal API connection failed:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Response:', error.response.data);
        } else if (error.code === 'ECONNREFUSED') {
            console.error('Connection refused - check your internet connection and Pesapal base URL');
        } else {
            console.error('Error:', error.message);
        }

        // Provide troubleshooting tips
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check your internet connection');
        console.log('2. Verify PESAPAL_BASE_URL is correct');
        console.log('3. Ensure PESAPAL_CONSUMER_KEY and PESAPAL_CONSUMER_SECRET are valid');
        console.log('4. Check if you\'re using sandbox or live credentials appropriately');
        console.log('5. Contact Pesapal support if credentials are confirmed to be correct');
    }
}

// Run the test
testPesapalConnection().then(() => {
    console.log('\n🏁 Pesapal connection test completed');
}).catch((error) => {
    console.error('💥 Test failed with error:', error.message);
});
