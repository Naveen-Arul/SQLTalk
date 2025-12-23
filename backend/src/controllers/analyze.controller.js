const { analyzeQuery } = require('../services/nlp.service');
const { generateSQL } = require('../services/sql.service');
const { validateSQL } = require('../utils/sqlValidator');
const db = require('../config/db');

const analyzeUserQuery = async (req, res) => {
  try {
    const { query } = req.body;

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Query is required and must be a non-empty string'
      });
    }

    // Generate SQL using LLM
    const generatedSQL = await generateSQL(query.trim());
    
    // Validate the generated SQL
    const validation = validateSQL(generatedSQL);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'SQL validation failed',
        message: validation.error,
        sql: generatedSQL
      });
    }
    
    // Execute the SQL query
    const startTime = Date.now();
    const result = await db.query(generatedSQL);
    const executionTime = Date.now() - startTime;
    
    // Extract column names from the result
    const columns = result.fields ? result.fields.map(field => field.name) : [];
    
    // Return structured response
    res.json({
      sql: generatedSQL,
      columns: columns,
      rows: result.rows,
      row_count: result.rows.length,
      execution_time_ms: executionTime
    });
  } catch (error) {
    console.error('Error in analyzeUserQuery:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to analyze query'
    });
  }
};

module.exports = {
  analyzeUserQuery
};