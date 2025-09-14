const mongoose = require('./eCommerce-Backend/node_modules/mongoose');
require('dotenv').config({ path: './.env' });

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const User = require('./eCommerce-Backend/Database/models/user.model');
        const user = await User.findOne({ email: 'test@example.com' });

        console.log('User found:', user ? 'YES' : 'NO');
        if (user) {
            console.log('Verification token:', user.verificationToken);
            console.log('Reset token:', user.resetPasswordToken);
            console.log('Is verified:', user.isVerified);
        } else {
            console.log('No user found with email test@example.com');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUser();
