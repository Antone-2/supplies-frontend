// pesapal.api.test.js
// Integration test for Pesapal payment endpoint with network call mocked.

const request = require('supertest');
const express = require('express');
const nock = require('nock');
const paymentRoutes = require('../src/routes/paymentRoutes');

// Only run if required env vars are present; otherwise skip to avoid false failures.
const required = ['PESAPAL_CONSUMER_KEY','PESAPAL_CONSUMER_SECRET'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  // eslint-disable-next-line jest/no-focused-tests
  describe.skip('Pesapal Payment API', () => { it(`skipped missing env: ${missing.join(',')}`, ()=>{}); });
} else {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/payment', paymentRoutes);

  describe('Pesapal Payment API', () => {
    beforeAll(() => {
      // Mock Pesapal endpoint (OAuth1 direct order posting)
      // The controller hits sandbox.pesapal.com/api/Transactions/PostPesapalDirectOrderV4 (POST)
      const baseUrl = process.env.PESAPAL_BASE_URL || 'https://sandbox.pesapal.com/api/Transactions/';
      const { host, pathname } = new URL(baseUrl + 'PostPesapalDirectOrderV4');
      // nock expects host without protocol
      nock(`https://${host}`)
        .post(pathname)
        .reply(200, { order_tracking_id: 'MOCK_TRACK_ID', redirect_url: 'https://pay.pesapal.com/mock' });
    });

    afterAll(() => {
      nock.cleanAll();
    });

    it('should initiate Pesapal payment and return tracking info', async () => {
      const res = await request(app)
        .post('/api/v1/payment/pesapal')
        .send({ amount: 1234, currency: 'KES', description: 'Test Order', billing_email: 'test@example.com' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pesapal');
      expect(res.body.pesapal).toHaveProperty('order_tracking_id');
    });
  });
}
