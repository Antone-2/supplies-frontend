require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock all problematic modules
jest.mock('../src/utils/emailService', () => ({
    sendVerificationEmail: jest.fn().mockResolvedValue({ messageId: 'mock-id' }),
    sendPasswordResetEmail: jest.fn().mockResolvedValue({ messageId: 'mock-id' }),
    sendEmail: jest.fn().mockResolvedValue({ messageId: 'mock-id' })
}));

jest.mock('../src/config/db', () => ({
    connect: jest.fn().mockResolvedValue(true)
}));

// Mock the entire server to avoid ES module issues
const mockApp = {
    post: jest.fn(),
    get: jest.fn(),
    use: jest.fn(),
    listen: jest.fn()
};

// Create a simple test server
const express = require('express');
const app = express();
app.use(express.json());

// Import and use auth routes directly
const authController = require('../src/controllers/authController');
const User = require('../src/models/User');

// Setup test routes
app.post('/api/auth/register', authController.registerUser);
app.post('/api/auth/login', authController.loginUser);
// app.get('/api/auth/me', authController.getCurrentUser); // Only if implemented


describe('Authentication Endpoints', () => {
    beforeAll(async () => {
        jest.setTimeout(60000); // Increase timeout to 60s
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI environment variable not set');
        console.log('Connecting to test DB:', uri);
        try {
            await mongoose.connect(uri, { connectTimeoutMS: 10000 });
            console.log('Connected to test DB');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            throw err;
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'Password123!',
                firstName: 'Test',
                lastName: 'User'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('registered successfully');

            const savedUser = await User.findOne({ email: 'test@example.com' });
            expect(savedUser).toBeTruthy();
            expect(savedUser.username).toBe('testuser');
        });

        it('should not register user with existing email', async () => {
            await User.create({
                name: 'Existing User',
                username: 'existinguser',
                email: 'existing@example.com',
                password: await bcrypt.hash('Password123!', 12),
                firstName: 'Existing',
                lastName: 'User',
                isVerified: true
            });

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'newuser',
                    email: 'existing@example.com',
                    password: 'Password123!',
                    firstName: 'New',
                    lastName: 'User'
                })
                .expect(400);

            expect(response.body.error).toContain('already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login a verified user successfully', async () => {
            const password = 'Password123!';
            const hashedPassword = await bcrypt.hash(password, 12);

            await User.create({
                name: 'Login User',
                username: 'loginuser',
                email: 'login@example.com',
                password: hashedPassword,
                firstName: 'Login',
                lastName: 'User',
                isVerified: true
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'login@example.com',
                    password: password
                })
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(response.body.user).toHaveProperty('email', 'login@example.com');
        });

        it('should not login unverified user', async () => {
            const password = 'Password123!';
            const hashedPassword = await bcrypt.hash(password, 12);

            await User.create({
                name: 'Unverified User',
                username: 'unverifieduser',
                email: 'unverified@example.com',
                password: hashedPassword,
                firstName: 'Unverified',
                lastName: 'User',
                isVerified: false
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'unverified@example.com',
                    password: password
                })
                .expect(400);

            expect(response.body.error).toContain('verify your email');
        });
    });
});
