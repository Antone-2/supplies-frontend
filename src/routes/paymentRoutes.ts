import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/initiate', authMiddleware, initiatePayment);
router.post('/verify', authMiddleware, verifyPayment);

export default router;