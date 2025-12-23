const db = require('../config/db');

const getData = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders LIMIT 20;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to fetch data from database'
    });
  }
};

module.exports = {
  getData
};