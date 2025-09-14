require('dotenv').config({ path: './eCommerce-Backend/.env' });

console.log('=== Email Configuration Check ===');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

if (process.env.EMAIL_PASS === 'YOUR_APP_PASSWORD_HERE') {
    console.log('\n❌ Gmail app password not updated yet!');
    console.log('Please update EMAIL_PASS in eCommerce-Backend/.env with your 16-character Gmail app password');
} else if (process.env.EMAIL_PASS && process.env.EMAIL_PASS.length === 16) {
    console.log('\n✅ Gmail app password appears to be set correctly');
} else {
    console.log('\n⚠️  Gmail app password may not be set correctly (should be 16 characters)');
}
