import { Router } from 'express';
import {
  getSceneById,
  getStartScene,
  submitChoice
} from '../controllers/game.controller.js';

const router = Router();

router.get('/start', getStartScene);
router.get('/scenes/:sceneId', getSceneById);
router.post('/scenes/:sceneId/choice', submitChoice);

export default router;