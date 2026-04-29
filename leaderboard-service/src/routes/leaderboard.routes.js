import { Router } from 'express';
import {
  createLeaderboardResult,
  getLeaderboard
} from '../controllers/leaderboard.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getLeaderboard);
router.post('/', authMiddleware, createLeaderboardResult);

export default router;