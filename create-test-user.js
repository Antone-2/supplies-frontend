const mongoose = require('./eCommerce-Backend/node_modules/mongoose');
const bcrypt = require('./eCommerce-Backend/node_modules/bcryptjs');
const crypto = require('crypto');
require('dotenv').config({ path: './.env' });

async function createTestUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const User = require('./eCommerce-Backend/Database/models/user.model');

        // Check if user already exists
        const existingUser = await User.findOne({ email: 'test@example.com' });
        if (existingUser) {
            console.log('User already exists, updating tokens and verification status...');
            existingUser.verificationToken = crypto.randomBytes(32).toString('hex');
            existingUser.resetPasswordToken = crypto.randomBytes(32).toString('hex');
            existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            existingUser.isVerified = true; // Ensure user is verified
            await existingUser.save();
            console.log('Verification token:', existingUser.verificationToken);
            console.log('Reset token:', existingUser.resetPasswordToken);
            return;
        }

        // Create new user
        const hashedPassword = await bcrypt.hash('TestPass123!', 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const resetToken = crypto.randomBytes(32).toString('hex');

        const user = new User({
            email: 'test@example.com',
            password: hashedPassword,
            name: 'Test User',
            verificationToken: verificationToken,
            resetPasswordToken: resetToken,
            resetPasswordExpires: Date.now() + 3600000, // 1 hour
            isVerified: true
        });

        await user.save();
        console.log('Test user created successfully!');
        console.log('Verification token:', verificationToken);
        console.log('Reset token:', resetToken);

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

createTestUser();
