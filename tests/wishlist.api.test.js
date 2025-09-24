const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Product = require('../src/models/Product');

let token;
let productId;

beforeAll(async () => {
    // Connect to test DB, create user and product, get auth token
    // (Assume helper functions exist or mock as needed)
});

describe('Wishlist API', () => {
    it('should add a product to wishlist', async () => {
        const res = await request(app)
            .post('/api/wishlist/add')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId });
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item._id === productId)).toBe(true);
    });

    it('should get wishlist', async () => {
        const res = await request(app)
            .get('/api/wishlist')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.items)).toBe(true);
    });

    it('should remove a product from wishlist', async () => {
        const res = await request(app)
            .post('/api/wishlist/remove')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId });
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.items)).toBe(true);
        expect(res.body.items.some(item => item._id === productId)).toBe(false);
    });
});

afterAll(async () => {
    // Clean up test data and close DB connection
    await mongoose.connection.close();
});
