import dotenv from 'dotenv';
import express from 'express';
import tasksRoute from './routes/tasksRouter.js';
import authRoute from './routes/authRoute.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { protectedRoute } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/tasks', protectedRoute, tasksRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
