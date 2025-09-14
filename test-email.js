const axios = require('axios');

async function testRegistration() {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
            name: 'Test User',
            email: 'onyangoantone1@gmail.com',
            password: 'Test123!@#'
        });
        console.log('Registration response:', response.data);
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
    }
}

testRegistration();
