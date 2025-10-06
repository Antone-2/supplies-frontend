// notification.api.test.js
// Comprehensive tests for notification system

const request = require('supertest');
const mongoose = require('mongoose');
const Notification = require('../Database/models/notification.model');
const User = require('../Database/models/user.model');
const {
    createTestUser,
    createTestAdmin,
    generateTestToken,
    createTestNotification,
    getAuthHeaders,
    clearCollection
} = require('./testUtils');

const {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    notifyOrderCreated,
    notifyOrderStatusChange
} = require('../eCommerce-Backend/src/services/notificationService');

describe('Notification System Tests', () => {
    let testUser, testAdmin, userToken, adminToken;
    let app;

    beforeAll(async () => {
        // Try to import server, fallback to basic app
        try {
            app = require('../eCommerce-Backend/server');
        } catch (error) {
            const express = require('express');
            app = express();
            app.use(express.json());
        }

        // Create test users
        testUser = await User.create(await createTestUser({
            email: 'notificationtest@example.com'
        }));

        testAdmin = await User.create(await createTestAdmin({
            email: 'notificationadmin@example.com'
        }));

        userToken = generateTestToken(testUser._id, false, 'customer');
        adminToken = generateTestToken(testAdmin._id, true, 'admin');
    });

    beforeEach(async () => {
        await clearCollection('Notification');
    });

    describe('Notification Service', () => {
        it('should create a notification', async () => {
            const notification = await createNotification(
                testUser._id,
                'Test Notification',
                'This is a test message',
                'order',
                { orderId: 'TEST123' },
                'high'
            );

            expect(notification).toBeTruthy();
            expect(notification.user.toString()).toBe(testUser._id.toString());
            expect(notification.title).toBe('Test Notification');
            expect(notification.type).toBe('order');
            expect(notification.priority).toBe('high');
            expect(notification.isRead).toBe(false);
        });

        it('should get user notifications with pagination', async () => {
            // Create test notifications
            for (let i = 0; i < 5; i++) {
                await createNotification(
                    testUser._id,
                    `Notification ${i}`,
                    `Message ${i}`,
                    'general'
                );
            }

            const result = await getUserNotifications(testUser._id, 1, 3);

            expect(result).toBeTruthy();
            expect(result.notifications).toHaveLength(3);
            expect(result.pagination.total).toBe(5);
            expect(result.pagination.totalPages).toBe(2);
            expect(result.unreadCount).toBe(5);
        });

        it('should filter unread notifications', async () => {
            // Create notifications (some read, some unread)
            const notification1 = await createNotification(testUser._id, 'Unread 1', 'Message 1');
            await createNotification(testUser._id, 'Unread 2', 'Message 2');

            // Mark one as read
            await Notification.findByIdAndUpdate(notification1._id, { isRead: true });

            const result = await getUserNotifications(testUser._id, 1, 10, true);

            expect(result.notifications).toHaveLength(1);
            expect(result.notifications[0].title).toBe('Unread 2');
            expect(result.unreadCount).toBe(1);
        });

        it('should mark notification as read', async () => {
            const notification = await createNotification(
                testUser._id,
                'Test Mark Read',
                'This will be marked as read'
            );

            const updatedNotification = await markAsRead(notification._id, testUser._id);

            expect(updatedNotification).toBeTruthy();
            expect(updatedNotification.isRead).toBe(true);
        });

        it('should mark all notifications as read', async () => {
            // Create multiple unread notifications
            await createNotification(testUser._id, 'Unread 1', 'Message 1');
            await createNotification(testUser._id, 'Unread 2', 'Message 2');
            await createNotification(testUser._id, 'Unread 3', 'Message 3');

            const markedCount = await markAllAsRead(testUser._id);

            expect(markedCount).toBe(3);

            // Verify all are now read
            const unreadCount = await Notification.countDocuments({
                user: testUser._id,
                isRead: false
            });
            expect(unreadCount).toBe(0);
        });
    });

    describe('Order Notifications', () => {
        it('should create order notification', async () => {
            const orderData = {
                orderId: 'TEST_ORDER_123',
                totalAmount: 199.99
            };

            await notifyOrderCreated(testUser._id, 'test@example.com', orderData);

            const notifications = await Notification.find({ user: testUser._id });
            expect(notifications).toHaveLength(1);
            expect(notifications[0].title).toBe('Order Confirmed');
            expect(notifications[0].type).toBe('order');
            expect(notifications[0].data.orderId).toBe('TEST_ORDER_123');
        });

        it('should create order status change notifications', async () => {
            const orderData = {
                orderId: 'TEST_ORDER_456',
                status: 'shipped',
                trackingNumber: 'TRACK123456'
            };

            await notifyOrderStatusChange(testUser._id, 'test@example.com', orderData);

            const notifications = await Notification.find({ user: testUser._id });
            expect(notifications).toHaveLength(1);
            expect(notifications[0].title).toBe('Order Shipped');
            expect(notifications[0].message).toContain('TRACK123456');
            expect(notifications[0].data.status).toBe('shipped');
        });

        it('should handle different order statuses', async () => {
            const statuses = ['processing', 'shipped', 'delivered', 'cancelled'];

            for (const status of statuses) {
                await notifyOrderStatusChange(testUser._id, 'test@example.com', {
                    orderId: `ORDER_${status.toUpperCase()}`,
                    status
                });
            }

            const notifications = await Notification.find({ user: testUser._id });
            expect(notifications).toHaveLength(4);

            const titles = notifications.map(n => n.title);
            expect(titles).toContain('Order Processing');
            expect(titles).toContain('Order Shipped');
            expect(titles).toContain('Order Delivered');
            expect(titles).toContain('Order Cancelled');
        });
    });

    describe('Notification Cleanup', () => {
        it('should clean up old read notifications', async () => {
            const oldDate = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000); // 31 days ago
            const recentDate = new Date();

            // Create old read notification
            await Notification.create({
                user: testUser._id,
                title: 'Old Notification',
                message: 'This is old',
                isRead: true,
                createdAt: oldDate
            });

            // Create recent unread notification
            await Notification.create({
                user: testUser._id,
                title: 'Recent Notification',
                message: 'This is recent',
                isRead: false,
                createdAt: recentDate
            });

            // Simulate cleanup (would normally be called by a cron job)
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const result = await Notification.deleteMany({
                createdAt: { $lt: thirtyDaysAgo },
                isRead: true
            });

            expect(result.deletedCount).toBe(1);

            // Verify recent notification still exists
            const remainingNotifications = await Notification.find({ user: testUser._id });
            expect(remainingNotifications).toHaveLength(1);
            expect(remainingNotifications[0].title).toBe('Recent Notification');
        });
    });

    describe('Notification Data Validation', () => {
        it('should validate required fields', async () => {
            try {
                await Notification.create({
                    // Missing required fields
                });
                fail('Should have thrown validation error');
            } catch (error) {
                expect(error.name).toBe('ValidationError');
            }
        });

        it('should validate notification type enum', async () => {
            try {
                await Notification.create({
                    user: testUser._id,
                    title: 'Test',
                    message: 'Test message',
                    type: 'invalid_type' // Invalid enum value
                });
                fail('Should have thrown validation error');
            } catch (error) {
                expect(error.name).toBe('ValidationError');
            }
        });

        it('should validate priority enum', async () => {
            try {
                await Notification.create({
                    user: testUser._id,
                    title: 'Test',
                    message: 'Test message',
                    priority: 'invalid_priority' // Invalid enum value
                });
                fail('Should have thrown validation error');
            } catch (error) {
                expect(error.name).toBe('ValidationError');
            }
        });

        it('should set default values correctly', async () => {
            const notification = await Notification.create({
                user: testUser._id,
                title: 'Test Default Values',
                message: 'Testing defaults'
            });

            expect(notification.type).toBe('general');
            expect(notification.priority).toBe('medium');
            expect(notification.isRead).toBe(false);
            expect(notification.data).toEqual({});
            expect(notification.expiresAt).toBeDefined();
        });
    });

    describe('Notification Indexing and Performance', () => {
        it('should efficiently query notifications by user and read status', async () => {
            // Create many notifications for performance testing
            const notifications = [];
            for (let i = 0; i < 100; i++) {
                notifications.push({
                    user: testUser._id,
                    title: `Notification ${i}`,
                    message: `Message ${i}`,
                    isRead: i % 2 === 0 // Half read, half unread
                });
            }
            await Notification.insertMany(notifications);

            const startTime = Date.now();

            const unreadNotifications = await Notification.find({
                user: testUser._id,
                isRead: false
            }).limit(10);

            const queryTime = Date.now() - startTime;

            expect(unreadNotifications).toHaveLength(10);
            expect(queryTime).toBeLessThan(100); // Should be fast due to indexing
        });
    });
});