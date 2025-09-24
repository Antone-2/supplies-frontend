const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const { admin } = require('../middleware/auth');

const { notifySubscribers } = require('../controllers/notifySubscribers');
const router = express.Router();

// POST /api/admin/notify-subscribers - send notification to all subscribers
router.post('/notify-subscribers', authenticateToken, admin, async (req, res) => {
  const { subject, html } = req.body;
  if (!subject || !html) return res.status(400).json({ error: 'Subject and message are required.' });
  try {
    await notifySubscribers(subject, html);
    res.json({ message: 'Notification sent to all subscribers.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification', details: err.message });
  }
});

// --- ADMIN PRODUCT CRUD ROUTES ---
const productController = require('../controllers/productController');

// GET /api/admin/products - view all products
router.get('/products', authenticateToken, admin, productController.getProducts);

// POST /api/admin/products - add new product
router.post('/products', authenticateToken, admin, productController.createProduct);

// PUT /api/admin/products/:id - edit product
router.put('/products/:id', authenticateToken, admin, productController.updateProduct);

// DELETE /api/admin/products/:id - delete product
router.delete('/products/:id', authenticateToken, admin, productController.deleteProduct);

// GET /api/admin/overview - KPI summary
router.get('/overview', authenticateToken, admin, async (req, res) => {
  try {
    const [userCount, productCount, orderCount, pendingOrders, lowStockProducts, revenueAgg] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: 'Pending' }),
      Product.find({ stock: { $lte: 5 } }).select('name stock'),
      Order.aggregate([
        { $match: { status: { $in: ['Paid', 'Completed', 'Delivered'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    ]);

    res.json({
      users: userCount,
      products: productCount,
      orders: orderCount,
      pendingOrders,
      revenue: revenueAgg[0]?.total || 0,
      lowStock: lowStockProducts.map(p => ({ id: p._id, name: p.name, stock: p.stock }))
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ message: 'Failed to load admin overview' });
  }
});

module.exports = router;
// ...existing code...