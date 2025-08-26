const Cart = require('../models/Cart');
const Product = require('../models/Product');

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// POST /api/cart/add
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Stock validation
    if (product.stock < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
        availableStock: product.stock
      });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Check if adding more would exceed stock
        const newQuantity = cart.items[itemIndex].quantity + quantity;
        if (newQuantity > product.stock) {
          return res.status(400).json({
            message: 'Insufficient stock for requested quantity',
            availableStock: product.stock - cart.items[itemIndex].quantity
          });
        }
        cart.items[itemIndex].quantity = newQuantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    // Populate product details for response
    const populatedCart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items.product',
        select: 'name price imageUrl stock'
      });

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
};

// PUT /api/cart/update
exports.updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Product not found in cart' });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: 'Server error updating cart' });
  }
};

// DELETE /api/cart/remove/:productId
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: 'Server error removing product from cart' });
  }
};