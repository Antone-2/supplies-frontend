const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// GET /api/orders - Get all orders (admin) or user’s own orders
router.get('/', auth, orderController.getOrders);

// GET /api/orders/:id - Get order by ID
router.get('/:id', auth, orderController.getOrderById);

// POST /api/orders - Place a new order
router.post('/', auth, orderController.placeOrder);

// PUT /api/orders/:id/status - Update order status (admin only)
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;
