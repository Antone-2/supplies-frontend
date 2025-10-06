const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Create test user
const createTestUser = async (userData = {}) => {
    const defaultUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAdmin: false,
        isVerified: true,
        role: 'customer'
    };

    const hashedPassword = await bcrypt.hash(userData.password || defaultUser.password, 10);

    return {
        ...defaultUser,
        ...userData,
        password: hashedPassword
    };
};

// Create test admin user
const createTestAdmin = async (userData = {}) => {
    return await createTestUser({
        name: 'Test Admin',
        email: 'admin@example.com',
        isAdmin: true,
        role: 'admin',
        ...userData
    });
};

// Generate JWT token for testing
const generateTestToken = (userId, isAdmin = false, role = 'customer') => {
    return jwt.sign(
        { id: userId, isAdmin, role },
        process.env.JWT_SECRET || 'test_secret',
        { expiresIn: '1h' }
    );
};

// Create test product
const createTestProduct = (productData = {}) => {
    return {
        name: 'Test Product',
        description: 'Test product description',
        price: 99.99,
        category: new mongoose.Types.ObjectId(),
        subcategory: new mongoose.Types.ObjectId(),
        brand: 'Test Brand',
        stock: 10,
        images: ['test-image.jpg'],
        isActive: true,
        features: ['Feature 1', 'Feature 2'],
        specifications: {
            weight: '1kg',
            dimensions: '10x10x10cm'
        },
        ...productData
    };
};

// Create test category
const createTestCategory = (categoryData = {}) => {
    return {
        name: 'Test Category',
        description: 'Test category description',
        isActive: true,
        ...categoryData
    };
};

// Create test order
const createTestOrder = (orderData = {}) => {
    return {
        _id: orderData._id || new mongoose.Types.ObjectId().toString(),
        items: [{
            productId: new mongoose.Types.ObjectId(),
            name: 'Test Product',
            quantity: 1,
            price: 99.99
        }],
        shippingAddress: {
            fullName: 'Test User',
            email: 'test@example.com',
            phone: '+254712345678',
            address: '123 Test Street',
            city: 'Nairobi',
            county: 'Nairobi',
            deliveryLocation: 'home'
        },
        totalAmount: 99.99,
        paymentMethod: 'pesapal',
        orderStatus: 'pending',
        paymentStatus: 'pending',
        timeline: [{
            status: 'pending',
            changedAt: new Date(),
            note: 'Order created'
        }],
        ...orderData
    };
};

// Create test cart item
const createTestCartItem = (cartData = {}) => {
    return {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        quantity: 1,
        addedAt: new Date(),
        ...cartData
    };
};

// Create test notification
const createTestNotification = (notificationData = {}) => {
    return {
        user: new mongoose.Types.ObjectId(),
        title: 'Test Notification',
        message: 'This is a test notification',
        type: 'general',
        isRead: false,
        priority: 'medium',
        data: {},
        ...notificationData
    };
};

// Mock email service for testing
const mockEmailService = {
    sendEmail: jest.fn().mockResolvedValue({ success: true, provider: 'mock' }),
    sendOrderConfirmation: jest.fn().mockResolvedValue({ success: true }),
    sendShippingNotification: jest.fn().mockResolvedValue({ success: true }),
    sendOrderEmail: jest.fn().mockResolvedValue(true)
};

// Create authenticated request headers
const getAuthHeaders = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// Generate random test data
const generateRandomString = (length = 10) => {
    return Math.random().toString(36).substring(2, length + 2);
};

const generateRandomEmail = () => {
    return `test_${generateRandomString(8)}@example.com`;
};

// Database helpers
const clearCollection = async (modelName) => {
    try {
        const model = mongoose.model(modelName);
        await model.deleteMany({});
    } catch (error) {
        console.error(`Error clearing ${modelName} collection:`, error);
    }
};

// Async test wrapper for better error handling
const asyncTest = (testFn) => {
    return async () => {
        try {
            await testFn();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    };
};

module.exports = {
    createTestUser,
    createTestAdmin,
    generateTestToken,
    createTestProduct,
    createTestCategory,
    createTestOrder,
    createTestCartItem,
    createTestNotification,
    mockEmailService,
    getAuthHeaders,
    generateRandomString,
    generateRandomEmail,
    clearCollection,
    asyncTest
};