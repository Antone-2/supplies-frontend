import { Router } from 'express';
import authRoutes from './authRoutes';       // Assuming you have this file for auth
import cartRoutes from './cartRoutes';       // Assuming you have implemented these
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;