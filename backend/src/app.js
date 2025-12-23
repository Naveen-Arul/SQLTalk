const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/data.routes');
const analyzeRoutes = require('./routes/analyze.routes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', dataRoutes);
app.use('/api', analyzeRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;