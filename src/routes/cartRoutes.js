const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const auth = authMiddleware.default || authMiddleware;
const Cart = require('../models/Cart.cjs');
const Product = require('../models/Product');

// GET /api/cart - Get logged in user's cart contents
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId: userId }).populate('cartItem.productId');
    if (!cart) {
      return res.status(200).json({ cartItem: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
});

// POST /api/cart/add - Add product to cart
router.post(
  '/add',
  auth,
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      let cart = await Cart.findOne({ userId: userId });
      if (!cart) {
        cart = new Cart({
          userId: userId,
          cartItem: [{ productId: productId, quantity }],
        });
      } else {
        const itemIndex = cart.cartItem.findIndex(item => (item.product?._id?.toString() || item.productId?.toString()) === productId);
        if (itemIndex > -1) {
          cart.cartItem[itemIndex].quantity += quantity; // Increment quantity
        } else {
          cart.cartItem.push({ productId: productId, quantity });
        }
      }

      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: 'Server error adding to cart' });
    }
  }
);

// PUT /api/cart/update - Update quantity of a product in the cart
router.put(
  '/update',
  auth,
  body('productId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
      let cart = await Cart.findOne({ userId: userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });

      const itemIndex = cart.cartItem.findIndex(item => (item.product?._id?.toString() || item.productId?.toString()) === productId);
      if (itemIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });

      cart.cartItem[itemIndex].quantity = quantity;
      await cart.save();

      res.status(200).json(cart);
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: 'Server error updating cart' });
    }
  }
);

// DELETE /api/cart/remove/:productId - Remove product from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.cartItem = cart.cartItem.filter(item => (item.product?._id?.toString() || item.productId?.toString()) !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: 'Server error removing product from cart' });
  }
});

module.exports = router;