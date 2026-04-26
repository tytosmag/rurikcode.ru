import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.LEADERBOARD_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Leaderboard service started on port ${PORT}`);
});