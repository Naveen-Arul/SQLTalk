const express = require('express');
const { analyzeUserQuery } = require('../controllers/analyze.controller');

const router = express.Router();

// POST /api/analyze - Analyze natural language query
router.post('/analyze', analyzeUserQuery);

module.exports = router;