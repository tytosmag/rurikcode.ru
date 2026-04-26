import { Router } from 'express';
import { login, logout, me, register, restore } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/restore', restore);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

export default router;