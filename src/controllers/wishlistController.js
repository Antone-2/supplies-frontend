const User = require('../models/User');
const Product = require('../models/Product'); // bridge loads TS model

// Get all wishlist items for the logged-in user
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id || req.user._id).populate('wishlist');
        res.status(200).json({ items: user.wishlist || [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a product to the user's wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id || req.user._id);
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }
        await user.populate('wishlist');
        res.status(200).json({ items: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove a product from the user's wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id || req.user._id);
        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== productId.toString()
        );
        await user.save();
        await user.populate('wishlist');
        res.status(200).json({ items: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};