const https = require('https');

function testEndpoint() {
    console.log('Testing verification token endpoint...');

    const postData = JSON.stringify({ email: 'test@example.com' });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/v1/auth/get-verification-token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {
        console.log('Response status:', res.statusCode);
        console.log('Response headers:', res.headers);

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response data:', data);
            if (data.includes('token')) {
                console.log('✅ Verification token retrieved successfully');
            } else {
                console.log('❌ No token in response');
            }
        });
    });

    req.on('error', (e) => {
        console.error('Error:', e);
    });

    req.write(postData);
    req.end();
}

testEndpoint();
