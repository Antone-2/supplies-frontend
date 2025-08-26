const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const paymentService = require('../services/paymentService');
const emailService = require('../services/emailService');

// GET /api/orders - Get all orders (admin) or user’s own orders
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    let orders;
    if (isAdmin) {
      orders = await Order.find().populate('user', 'name email').populate('items.product');
    } else {
      orders = await Order.find({ user: userId }).populate('items.product');
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// GET /api/orders/:id - Get order by ID (admins or owner)
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    const order = await Order.findById(orderId).populate('items.product').populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!isAdmin && order.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: 'Server error fetching order' });
  }
};

// POST /api/orders - Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Create order items array
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Create new order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      status: 'Pending',
      createdAt: new Date(),
    });

    await order.save();

    // Optionally: Clear user's cart after order
    cart.items = [];
    await cart.save();

    // Integrate payment processing (e.g., redirect or request PesaPal payment)
    // This example assumes async payment initiation:
    const paymentUrl = await paymentService.createPayment(order, req.user);

    // Send order confirmation email asynchronously
    emailService.sendOrderConfirmation(req.user.email, order).catch(console.error);

    res.status(201).json({ order, paymentUrl });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: 'Server error placing order' });
  }
};

// PUT /api/orders/:id/status - Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    const validStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: 'Server error updating order' });
  }
};