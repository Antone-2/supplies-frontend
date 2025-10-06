#!/usr/bin/env node

/**
 * Newsletter API Test Script
 * Tests the newsletter subscription functionality
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:5000'; // Adjust if your server runs on different port
const API_ENDPOINT = '/api/v1/newsletter/subscribe';

const testData = {
    email: 'test@example.com',
    firstName: 'Test',
    source: 'test'
};

function makeRequest(data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: API_ENDPOINT,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: parsed
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: responseData,
                        parseError: error.message
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

async function testNewsletterAPI() {
    console.log('🧪 Testing Newsletter Subscription API...\n');
    
    try {
        console.log('📧 Testing newsletter subscription...');
        console.log('Endpoint:', `${BASE_URL}${API_ENDPOINT}`);
        console.log('Test data:', JSON.stringify(testData, null, 2));
        console.log('');
        
        const response = await makeRequest(testData);
        
        console.log('📊 Response Status:', response.statusCode);
        console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));
        
        if (response.statusCode === 200 || response.statusCode === 201) {
            console.log('✅ Newsletter subscription test PASSED');
        } else if (response.statusCode === 409) {
            console.log('⚠️  Email already subscribed (this is expected behavior)');
        } else {
            console.log('❌ Newsletter subscription test FAILED');
            if (response.parseError) {
                console.log('Parse Error:', response.parseError);
                console.log('Raw Response:', response.data);
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed with error:');
        console.error(error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Make sure your backend server is running on port 5000');
            console.log('   Try: cd eCommerce-Backend && npm start');
        }
    }
}

// Run the test
testNewsletterAPI();