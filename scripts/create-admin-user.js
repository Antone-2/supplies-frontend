#!/usr/bin/env node

// Script to create admin user: info@medhelmsupplies.co.ke with password: Texas99$

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Define User schema directly in this script
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    addresses: [{
        type: {
            type: String,
            required: true,
            enum: ['Home', 'Work', 'Other'],
            default: 'Home'
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'customer'],
        default: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    googleId: String,
    avatar: String
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

const ADMIN_CREDENTIALS = {
    email: 'info@medhelmsupplies.co.ke',
    password: 'Texas99$',
    name: 'MEDHELM Admin',
    role: 'admin'
};

async function createAdminUser() {
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

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ email: ADMIN_CREDENTIALS.email });
        if (existingAdmin) {
            console.log('🔄 Admin user already exists. Updating password...');
            
            // Update existing user with new password and ensure admin role
            const hashedPassword = await bcrypt.hash(ADMIN_CREDENTIALS.password, 12);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = 'admin';
            existingAdmin.isAdmin = true;
            existingAdmin.isVerified = true;
            existingAdmin.name = ADMIN_CREDENTIALS.name;
            
            await existingAdmin.save();
            console.log('✅ Admin user updated successfully');
            console.log(`📧 Email: ${ADMIN_CREDENTIALS.email}`);
            console.log(`🔑 Password: ${ADMIN_CREDENTIALS.password}`);
            console.log(`👤 Role: admin`);
        } else {
            console.log('👤 Creating new admin user...');
            
            // Hash the password
            const hashedPassword = await bcrypt.hash(ADMIN_CREDENTIALS.password, 12);
            
            // Create new admin user
            const adminUser = new User({
                name: ADMIN_CREDENTIALS.name,
                email: ADMIN_CREDENTIALS.email.toLowerCase(),
                password: hashedPassword,
                role: 'admin',
                isAdmin: true,
                isVerified: true,
                phone: '+254700000000', // Default admin phone
                addresses: []
            });

            await adminUser.save();
            console.log('✅ Admin user created successfully');
            console.log(`📧 Email: ${ADMIN_CREDENTIALS.email}`);
            console.log(`🔑 Password: ${ADMIN_CREDENTIALS.password}`);
            console.log(`👤 Role: admin`);
            console.log(`🆔 User ID: ${adminUser._id}`);
        }

        // Verify admin user can be found and authenticated
        console.log('\n🔍 Verifying admin user...');
        const verifyUser = await User.findOne({ email: ADMIN_CREDENTIALS.email });
        if (verifyUser) {
            const passwordMatch = await bcrypt.compare(ADMIN_CREDENTIALS.password, verifyUser.password);
            if (passwordMatch) {
                console.log('✅ Admin user verification successful');
                console.log(`👤 Name: ${verifyUser.name}`);
                console.log(`📧 Email: ${verifyUser.email}`);
                console.log(`🔐 Role: ${verifyUser.role}`);
                console.log(`✔️ IsAdmin: ${verifyUser.isAdmin}`);
                console.log(`✔️ IsVerified: ${verifyUser.isVerified}`);
            } else {
                console.log('❌ Password verification failed');
            }
        } else {
            console.log('❌ Admin user not found after creation');
        }

        console.log('\n🎉 Admin user setup completed successfully!');
        console.log('\nYou can now login to the admin panel with:');
        console.log(`Email: ${ADMIN_CREDENTIALS.email}`);
        console.log(`Password: ${ADMIN_CREDENTIALS.password}`);

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('📤 Database connection closed');
        process.exit(0);
    }
}

// Run the script
console.log('🚀 Starting admin user creation script...');
console.log('Creating admin user with credentials:');
console.log(`Email: ${ADMIN_CREDENTIALS.email}`);
console.log(`Password: ${ADMIN_CREDENTIALS.password}`);
console.log('');

createAdminUser();

export { createAdminUser, ADMIN_CREDENTIALS };