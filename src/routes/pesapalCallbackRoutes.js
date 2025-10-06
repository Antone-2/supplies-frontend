const express = require('express');
const router = express.Router();
const orderModel = require('../../Database/models/order.model');
const pesaPalConfig = require('../config/pesaPalConfig');
const axios = require('axios');

// PesaPal IPN (Instant Payment Notification) Handler - Production Ready
router.post('/ipn', async (req, res) => {
    try {
        console.log('PesaPal IPN received:', req.body);
        
        const { notification_type, transaction_tracking_id, merchant_reference } = req.body;
        
        if (!transaction_tracking_id || !merchant_reference) {
            console.error('Missing PesaPal IPN data:', req.body);
            return res.status(400).json({ message: 'Missing transaction data' });
        }

        // Get PesaPal OAuth token
        const token = await getPesapalToken();
        
        // Verify payment status with PesaPal
        const statusUrl = `${pesaPalConfig.api.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${transaction_tracking_id}`;
        
        let paymentStatus = 'INVALID';
        try {
            const statusRes = await axios.get(statusUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            paymentStatus = statusRes.data.status;
            console.log('PesaPal payment status:', paymentStatus);
        } catch (error) {
            console.error('Failed to verify payment with PesaPal:', error.response?.data || error.message);
            return res.status(500).json({ message: 'Failed to verify payment' });
        }

        // Update order based on payment status
        if (paymentStatus === 'COMPLETED') {
            const order = await orderModel.findOneAndUpdate(
                { _id: merchant_reference },
                { 
                    isPaid: true, 
                    paidAt: new Date(), 
                    paymentMethod: 'PESAPAL',
                    orderStatus: 'confirmed',
                    paymentResult: { 
                        transaction_tracking_id, 
                        status: paymentStatus,
                        notification_type
                    },
                    $push: {
                        timeline: {
                            status: 'confirmed',
                            changedAt: new Date(),
                            note: 'Payment completed via PesaPal'
                        },
                        activityLog: {
                            action: 'payment_completed',
                            message: `Payment completed - Transaction ID: ${transaction_tracking_id}`,
                            createdAt: new Date()
                        }
                    }
                },
                { new: true }
            );

            if (!order) {
                console.error('Order not found for merchant_reference:', merchant_reference);
                return res.status(404).json({ message: 'Order not found' });
            }

            console.log('Order updated successfully:', order._id);
            
            // TODO: Send confirmation email to customer
            // TODO: Send SMS notification
            // TODO: Update inventory
            // TODO: Trigger fulfillment process
            
            return res.status(200).json({ message: 'Payment confirmed and order updated' });
        } 
        else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
            const order = await orderModel.findOneAndUpdate(
                { _id: merchant_reference },
                { 
                    paymentResult: { 
                        transaction_tracking_id, 
                        status: paymentStatus,
                        notification_type
                    },
                    orderStatus: 'cancelled',
                    $push: {
                        timeline: {
                            status: 'cancelled',
                            changedAt: new Date(),
                            note: `Payment ${paymentStatus.toLowerCase()} via PesaPal`
                        },
                        activityLog: {
                            action: 'payment_failed',
                            message: `Payment ${paymentStatus.toLowerCase()} - Transaction ID: ${transaction_tracking_id}`,
                            createdAt: new Date()
                        }
                    }
                },
                { new: true }
            );

            if (order) {
                console.log('Order cancelled due to payment failure:', order._id);
                // TODO: Restore inventory
                // TODO: Send notification to customer
            }

            return res.status(200).json({ message: `Payment ${paymentStatus.toLowerCase()}` });
        }
        else {
            console.log(`Payment pending - Status: ${paymentStatus}`);
            return res.status(200).json({ message: `Payment status: ${paymentStatus}` });
        }

    } catch (error) {
        console.error('PesaPal IPN handler error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PesaPal Callback Handler - When customer returns from payment
router.get('/callback', async (req, res) => {
    try {
        const { OrderTrackingId, OrderMerchantReference } = req.query;
        
        if (!OrderTrackingId || !OrderMerchantReference) {
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=missing_data`);
        }

        // Get payment status
        const token = await getPesapalToken();
        const statusUrl = `${pesaPalConfig.api.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`;
        
        try {
            const statusRes = await axios.get(statusUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const paymentStatus = statusRes.data.status;
            
            if (paymentStatus === 'COMPLETED') {
                return res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${OrderMerchantReference}&trackingId=${OrderTrackingId}`);
            } else if (paymentStatus === 'FAILED' || paymentStatus === 'CANCELLED') {
                return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?orderId=${OrderMerchantReference}&status=${paymentStatus}`);
            } else {
                return res.redirect(`${process.env.FRONTEND_URL}/payment-pending?orderId=${OrderMerchantReference}&status=${paymentStatus}`);
            }
            
        } catch (error) {
            console.error('Failed to check payment status:', error);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=verification_failed`);
        }
        
    } catch (error) {
        console.error('PesaPal callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/payment-failed?error=server_error`);
    }
});

// Helper function to get PesaPal OAuth token
async function getPesapalToken() {
    const consumerKey = pesaPalConfig.api.consumerKey;
    const consumerSecret = pesaPalConfig.api.consumerSecret;
    
    try {
        const res = await axios.post(`${pesaPalConfig.api.baseUrl}/api/Auth/RequestToken`, {
            consumer_key: consumerKey,
            consumer_secret: consumerSecret
        });
        return res.data.token;
    } catch (error) {
        console.error('Failed to get PesaPal token:', error.response?.data || error.message);
        throw new Error('PesaPal authentication failed');
    }
}

// Payment status check endpoint
router.get('/status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({
            success: true,
            data: {
                orderId: order._id,
                paymentStatus: order.isPaid ? 'paid' : 'pending',
                orderStatus: order.orderStatus,
                transactionId: order.paymentResult?.transaction_tracking_id,
                paidAt: order.paidAt
            }
        });
    } catch (error) {
        console.error('Payment status check error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;