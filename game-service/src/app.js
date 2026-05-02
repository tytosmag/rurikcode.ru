import express from 'express';
import gameRoutes from './routes/game.routes.js';

const app = express();

app.use(express.json());

app.get('/api/game/health', (req, res) => {
  return res.json({ status: 'game-service ok' });
});

app.use('/api/game', gameRoutes);

export default app;