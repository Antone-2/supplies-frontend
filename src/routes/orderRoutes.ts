import { Router } from 'express';
import { body } from 'express-validator';
import orderController from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequest';

const router = Router();

router.use(authMiddleware); // All order routes require auth

// Get orders (admin or user-self)
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

// Place order
router.post(
  '/',
  validateRequest,
  orderController.placeOrder
);

// Admin update order status
router.put(
  '/:id/status',
  authMiddleware,
  body('status').isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
  validateRequest,
  orderController.updateOrderStatus
);

export default router;