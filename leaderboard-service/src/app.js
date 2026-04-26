import express from 'express';
import leaderboardRoutes from './routes/leaderboard.routes.js';

const app = express();

app.use(express.json());

app.get('/api/leaderboard/health', (req, res) => {
  return res.json({ status: 'leaderboard-service ok' });
});

app.use('/api/leaderboard', leaderboardRoutes);

export default app;