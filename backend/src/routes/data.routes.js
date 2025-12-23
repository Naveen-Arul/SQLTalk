const express = require('express');
const { getData } = require('../controllers/data.controller');

const router = express.Router();

// GET /api/data - Fetch data from database
router.get('/data', getData);

module.exports = router;