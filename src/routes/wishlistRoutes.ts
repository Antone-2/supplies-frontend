const express = require('express');
const { body } = require('express-validator');
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Protect all wishlist routes with auth
router.use(authMiddleware);

// GET /api/wishlist - get wishlist contents
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist/add - add product to wishlist
router.post(
  '/add',
  body('productId').isMongoId().withMessage('Valid productId is required'),
  validateRequest,
  wishlistController.addToWishlist
);

// POST /api/wishlist/remove - remove item from wishlist (expects { productId })
router.post('/remove', wishlistController.removeFromWishlist);

module.exports = router;