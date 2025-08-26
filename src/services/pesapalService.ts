import axios from 'axios';
import crypto from 'crypto';

interface PesapalPaymentParams {
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_phone?: string;
  billing_email?: string;
}

class PesapalService {
  private consumerKey: string;
  private consumerSecret: string;
  private baseUrl: string;

  constructor() {
    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY || '';
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET || '';
    this.baseUrl = process.env.PESAPAL_BASE_URL || 'https://sandbox.pesapal.com/api/Transactions/';
  }

  private generateOauthSignature(httpMethod: string, requestUrl: string, params: Record<string, string>): string {
    const oauthParams = {
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: this.generateNonce(),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_version: '1.0',
    };

    const combinedParams = { ...oauthParams, ...params };
      // Add index signature to combinedParams for TypeScript
      const combinedParamsTyped: { [key: string]: string } = combinedParams as { [key: string]: string };
      const sortedParams = Object.keys(combinedParamsTyped)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(combinedParamsTyped[key])}`)
        .join('&');

    const baseString = `${httpMethod.toUpperCase()}&${encodeURIComponent(requestUrl)}&${encodeURIComponent(sortedParams)}`;
    const signingKey = `${encodeURIComponent(this.consumerSecret)}&`;

    return crypto
      .createHmac('sha1', signingKey)
      .update(baseString)
      .digest('base64');
  }

  private generateNonce(length = 11): string {
    return crypto.randomBytes(length).toString('hex');
  }

  async initiatePayment(paymentParams: PesapalPaymentParams): Promise<string> {
    try {
      const url = `${this.baseUrl}PostPesapalDirectOrderV4`;
      const params = {
        Amount: paymentParams.amount.toString(),
        Currency: paymentParams.currency,
        Description: paymentParams.description,
        Type: 'MERCHANT',
        Reference: paymentParams.notification_id,
        PhoneNumber: paymentParams.billing_phone || '',
        Email: paymentParams.billing_email || '',
        CallbackURL: paymentParams.callback_url,
      };

      const signature = this.generateOauthSignature('POST', url, params);

      const response = await axios.post(url, params, {
        headers: {
          'Authorization': `OAuth oauth_consumer_key="${this.consumerKey}",oauth_signature_method="HMAC-SHA1",oauth_signature="${encodeURIComponent(signature)}",oauth_timestamp="${Math.floor(Date.now() / 1000)}",oauth_nonce="${this.generateNonce()}",oauth_version="1.0"`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.OrderTrackingId;
    } catch (error) {
      console.error('Pesapal Payment Initiation Error:', error);
      throw new Error('Failed to initiate payment');
    }
  }

  async checkPaymentStatus(orderTrackingId: string): Promise<string> {
    try {
      const url = `${this.baseUrl}QueryPaymentStatus`;
      const params = {
        OrderTrackingId: orderTrackingId,
      };

      const signature = this.generateOauthSignature('GET', url, params);

      const response = await axios.get(url, {
        params,
        headers: {
          'Authorization': `OAuth oauth_consumer_key="${this.consumerKey}",oauth_signature_method="HMAC-SHA1",oauth_signature="${encodeURIComponent(signature)}",oauth_timestamp="${Math.floor(Date.now() / 1000)}",oauth_nonce="${this.generateNonce()}",oauth_version="1.0"`,
        },
      });

      return response.data.PaymentStatusCode;
    } catch (error) {
      console.error('Pesapal Payment Status Check Error:', error);
      throw new Error('Failed to check payment status');
    }
  }
}

export default new PesapalService();