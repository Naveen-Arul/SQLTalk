const ALLOWED_TABLES = ['orders', 'customers', 'products'];
const BLOCKED_KEYWORDS = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'TRUNCATE', 'GRANT', 'REVOKE'];

const validateSQL = (sql) => {
  if (!sql || typeof sql !== 'string') {
    return {
      isValid: false,
      error: 'SQL must be a non-empty string'
    };
  }

  const upperSql = sql.trim().toUpperCase();

  // Check if it starts with SELECT
  if (!upperSql.startsWith('SELECT')) {
    return {
      isValid: false,
      error: 'SQL must be a SELECT statement only'
    };
  }

  // Check for blocked keywords
  for (const keyword of BLOCKED_KEYWORDS) {
    if (upperSql.includes(keyword)) {
      return {
        isValid: false,
        error: `SQL contains blocked keyword: ${keyword}`
      };
    }
  }

  // Check that all tables are in allowed list
  const tableMatches = upperSql.match(/\bFROM\s+([A-Za-z_][A-Za-z0-9_]*)\b|\bJOIN\s+([A-Za-z_][A-Za-z0-9_]*)\b/gi);
  if (tableMatches) {
    for (const match of tableMatches) {
      const tableName = match.replace(/\b(FROM|JOIN)\s+/i, '').trim();
      if (!ALLOWED_TABLES.includes(tableName.toLowerCase())) {
        return {
          isValid: false,
          error: `SQL references disallowed table: ${tableName}`
        };
      }
    }
  }

  return {
    isValid: true,
    error: null
  };
};

module.exports = {
  validateSQL
};