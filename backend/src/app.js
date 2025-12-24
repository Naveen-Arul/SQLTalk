const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/data.routes');
const analyzeRoutes = require('./routes/analyze.routes');

require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'https://sqltalk-backend.onrender.com',
    'https://sql-talk.vercel.app', // Your production Vercel URL
    'https://sqltalk-git-main-username.vercel.app', // Replace with your actual Vercel URL
    'https://*.vercel.app' // Wildcard for Vercel preview deployments
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', dataRoutes);
app.use('/api', analyzeRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'SQLTalk Backend API', status: 'running' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;