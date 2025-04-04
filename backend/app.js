import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './utils/dataBase.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

connectDB();

const __dirname = path.resolve();

// Enable CORS
app.use(cors({
  origin: ['http://127.0.0.1:8000', 'http://localhost:8001'], // Allow both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'application/json'],
  credentials: true  // Required for cookies
}));

app.use(express.static(path.join(__dirname, '/client/dist')));
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Ensure this middleware is added before your routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send("server is ready"))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(port, () => {
  console.log(`Server listening http://127.0.0.1:${port}`);
});