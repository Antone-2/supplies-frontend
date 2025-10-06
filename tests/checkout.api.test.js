const request = require('supertest');
const app = require('../eCommerce-Backend/server');

describe('Checkout API', () => {
  it('should not allow checkout without authentication', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ items: [], shippingAddress: {}, totalAmount: 1000, paymentMethod: 'pesapal' });
    expect(res.statusCode).toBe(401);
  });

  it('should validate required fields', async () => {
    // Simulate authenticated request with missing fields
    const token = 'testtoken';
    const res = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [], shippingAddress: {}, totalAmount: 1000, paymentMethod: 'pesapal' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  // Add more tests for successful checkout, payment integration, etc.
});
