import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

const app = express();

app.use(cors({
  // origin: 'http://localhost:8080', // Но так как фронт и бэк на одном домене, можно указать просто '*'
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/auth/health', (req, res) => {
  return res.json({ status: 'auth-service ok' });
});

app.use('/api/auth', routes);

export default app;