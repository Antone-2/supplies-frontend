import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequest';

const router = Router();

router.post(
  '/register',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password minimum 8 characters'),
  validateRequest,
  userController.registerUser
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
  userController.loginUser
);

router.get('/profile', authMiddleware, userController.getProfile);

router.put('/profile', authMiddleware, userController.updateProfile);

export default router;