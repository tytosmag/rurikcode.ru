import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.GAME_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Game service started on port ${PORT}`);
});