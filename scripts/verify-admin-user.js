#!/usr/bin/env node

// Quick verification script to check admin user authentication

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Define User schema directly in this script  
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    addresses: [{ type: Object }],
    loyaltyPoints: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin', 'customer'], default: 'user' },
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    googleId: String,
    avatar: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const ADMIN_EMAIL = 'info@medhelmsupplies.co.ke';
const ADMIN_PASSWORD = 'Texas99$';

async function verifyAdminUser() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is required');
        }
        
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Find admin user
        console.log(`🔍 Looking for admin user: ${ADMIN_EMAIL}`);
        const adminUser = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
        
        if (!adminUser) {
            console.log('❌ Admin user not found');
            console.log('💡 Run the create-admin-user.js script first to create the admin user');
            return;
        }

        console.log('✅ Admin user found:');
        console.log(`   👤 Name: ${adminUser.name}`);
        console.log(`   📧 Email: ${adminUser.email}`);
        console.log(`   🔐 Role: ${adminUser.role}`);
        console.log(`   ✔️ IsAdmin: ${adminUser.isAdmin}`);
        console.log(`   ✔️ IsVerified: ${adminUser.isVerified}`);
        console.log(`   🆔 ID: ${adminUser._id}`);

        // Test password authentication
        console.log('\n🔑 Testing password authentication...');
        const passwordMatch = await bcrypt.compare(ADMIN_PASSWORD, adminUser.password);
        
        if (passwordMatch) {
            console.log('✅ Password authentication successful');
            console.log('\n🎉 Admin user is ready for login!');
            console.log('\nLogin credentials:');
            console.log(`Email: ${ADMIN_EMAIL}`);
            console.log(`Password: ${ADMIN_PASSWORD}`);
        } else {
            console.log('❌ Password authentication failed');
            console.log('💡 The stored password does not match the expected password');
        }

        // Check admin permissions
        console.log('\n🔧 Checking admin permissions...');
        const hasAdminRole = adminUser.role === 'admin';
        const hasAdminFlag = adminUser.isAdmin === true;
        
        console.log(`   Role check: ${hasAdminRole ? '✅' : '❌'} (${adminUser.role})`);
        console.log(`   Admin flag: ${hasAdminFlag ? '✅' : '❌'} (${adminUser.isAdmin})`);
        
        if (hasAdminRole && hasAdminFlag) {
            console.log('✅ All admin permissions are correctly set');
        } else {
            console.log('⚠️ Admin permissions may need to be updated');
        }

    } catch (error) {
        console.error('❌ Error verifying admin user:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n📤 Database connection closed');
        process.exit(0);
    }
}

// Run the script
console.log('🔍 Admin User Verification Script');
console.log('================================');
verifyAdminUser();

export { verifyAdminUser };