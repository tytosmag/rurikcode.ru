import { Router } from 'express';
import {
  createLeaderboardResult,
  getLeaderboard
} from '../controllers/leaderboard.controller.js';

const router = Router();

router.get('/', getLeaderboard);
router.post('/', createLeaderboardResult);

export default router;