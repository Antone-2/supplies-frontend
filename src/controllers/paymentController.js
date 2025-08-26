import { Request, Response } from 'express';
import PesapalService from '../services/pesapalService';
import Order from '../models/Order';
import { v4 as uuidv4 } from 'uuid';

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { amount, products } = req.body;

    // Create Order in Database
    const order = new Order({
      user: req.user._id,
      products,
      totalAmount: amount,
      paymentStatus: 'PENDING'
    });
    await order.save();

    // Generate Unique Notification ID
    const notificationId = uuidv4();

    // Initiate Pesapal Payment
    const paymentResponse = await PesapalService.initiatePayment({
      amount,
      currency: 'KES',
      description: 'Product Purchase',
      callback_url: `${process.env.FRONTEND_URL}/payment-callback`,
      notification_id: notificationId,
      billing_email: req.user.email
    });

    // Update Order with Pesapal Tracking ID
    order.pesapalOrderId = paymentResponse;
    await order.save();

    res.status(200).json({
      redirectUrl: `https://sandbox.pesapal.com/api/PostPesapalDirectOrderV4?OrderTrackingId=${paymentResponse}`,
      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { orderTrackingId } = req.body;

    // Check Payment Status with Pesapal
    const paymentStatus = await PesapalService.checkPaymentStatus(orderTrackingId);

    // Update Order Status
    const order = await Order.findOne({ pesapalOrderId: orderTrackingId });

    if (order) {
      order.paymentStatus = paymentStatus === 'COMPLETED' ? 'PAID' : 'FAILED';
      await order.save();
    }

    res.status(200).json({ status: paymentStatus });
  } catch (error) {
    res.status(500).json({ error: 'Payment verification failed' });
  }
};