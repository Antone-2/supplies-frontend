import { Router } from 'express';
import { body } from 'express-validator';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequest';

const router = Router();

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin routes (protected)
router.post(
  '/',
  authMiddleware,
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  validateRequest,
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  validateRequest,
  productController.updateProduct
);

router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;