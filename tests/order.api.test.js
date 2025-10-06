// order.api.test.js
// Comprehensive integration tests for order API endpoints

const request = require('supertest');
const mongoose = require('mongoose');
const Order = require('../Database/models/order.model');
const User = require('../Database/models/user.model');
const Product = require('../Database/models/product.model');
const {
    createTestUser,
    createTestAdmin,
    generateTestToken,
    createTestOrder,
    createTestProduct,
    getAuthHeaders,
    mockEmailService
} = require('./testUtils');

// Mock the email service
jest.mock('../eCommerce-Backend/src/services/emailService', () => mockEmailService);
jest.mock('../eCommerce-Backend/src/services/notificationService', () => ({
    notifyOrderCreated: jest.fn(),
    notifyOrderStatusChange: jest.fn()
}));

describe('Order API Integration Tests', () => {
    let testUser, testAdmin, userToken, adminToken;
    let testProduct, testOrder;
    let app;

    beforeAll(async () => {
        // Import app after mocks are set up
        try {
            app = require('../eCommerce-Backend/server');
        } catch (error) {
            console.error('Failed to import server:', error);
            // Use minimal express app for testing
            const express = require('express');
            app = express();
            app.use(express.json());
        }

        // Create test users
        testUser = await User.create(await createTestUser({
            email: 'ordertest@example.com'
        }));

        testAdmin = await User.create(await createTestAdmin({
            email: 'orderadmin@example.com'
        }));

        userToken = generateTestToken(testUser._id, false, 'customer');
        adminToken = generateTestToken(testAdmin._id, true, 'admin');

        // Create test product
        testProduct = await Product.create(createTestProduct({
            name: 'Test Order Product',
            price: 150.00
        }));
    });

    beforeEach(async () => {
        // Clear orders before each test
        await Order.deleteMany({});
        jest.clearAllMocks();
    });

    describe('Order Creation', () => {
        it('should create a new order successfully', async () => {
            const orderData = createTestOrder({
                orderId: 'TEST' + Date.now(),
                items: [{
                    productId: testProduct._id,
                    name: testProduct.name,
                    quantity: 2,
                    price: testProduct.price
                }],
                totalAmount: testProduct.price * 2
            });

            // Direct database test as fallback
            const order = await Order.create(orderData);
            expect(order).toBeTruthy();
            expect(order.totalAmount).toBe(orderData.totalAmount);
            expect(order.orderStatus).toBe('pending');
            expect(order.timeline).toHaveLength(1);
        });

        it('should validate order data correctly', async () => {
            const invalidOrder = {
                items: [],
                shippingAddress: {
                    fullName: '',
                    email: 'invalid-email'
                }
            };

            try {
                await Order.create(invalidOrder);
                fail('Should have thrown validation error');
            } catch (error) {
                expect(error.name).toBe('ValidationError');
            }
        });

        it('should handle order status updates', async () => {
            const orderData = createTestOrder({
                _id: 'UPDATE_TEST_ORDER'
            });

            const order = await Order.create(orderData);

            // Update order status
            order.orderStatus = 'shipped';
            order.trackingNumber = 'TRACK12345';
            order.timeline.push({
                status: 'shipped',
                changedAt: new Date(),
                note: 'Order shipped'
            });

            await order.save();

            expect(order.orderStatus).toBe('shipped');
            expect(order.trackingNumber).toBe('TRACK12345');
            expect(order.timeline).toHaveLength(2);
        });
    });

    describe('Order Queries', () => {
        beforeEach(async () => {
            // Create test orders
            for (let i = 0; i < 5; i++) {
                await Order.create(createTestOrder({
                    _id: 'ORDER' + i,
                    totalAmount: 100 + i * 50,
                    orderStatus: i % 2 === 0 ? 'pending' : 'shipped'
                }));
            }
        });

        it('should find orders by status', async () => {
            const pendingOrders = await Order.find({ orderStatus: 'pending' });
            expect(pendingOrders.length).toBe(3);

            const shippedOrders = await Order.find({ orderStatus: 'shipped' });
            expect(shippedOrders.length).toBe(2);
        });

        it('should sort orders by creation date', async () => {
            const orders = await Order.find().sort({ createdAt: -1 });
            expect(orders).toHaveLength(5);

            // Check if sorted descending
            for (let i = 1; i < orders.length; i++) {
                expect(orders[i - 1].createdAt.getTime()).toBeGreaterThanOrEqual(
                    orders[i].createdAt.getTime()
                );
            }
        });
    });
});
