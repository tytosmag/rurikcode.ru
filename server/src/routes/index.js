import { Router } from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

export default router;