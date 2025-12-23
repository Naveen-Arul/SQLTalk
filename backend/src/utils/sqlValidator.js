const ALLOWED_TABLES = ['orders', 'customers', 'products'];
const BLOCKED_KEYWORDS = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'TRUNCATE', 'GRANT', 'REVOKE', 'UNION', 'UNION ALL'];

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
    // Check for exact word boundaries to prevent bypass attempts
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(upperSql)) {
      return {
        isValid: false,
        error: `SQL contains blocked keyword: ${keyword}`
      };
    }
  }

  // Additional security checks
  // Check for comment patterns that might be used to bypass validation
  if (/(\/\*|\*\/|--|#)/.test(sql)) {
    return {
      isValid: false,
      error: 'SQL contains comment patterns which are not allowed'
    };
  }

  // Check for potential UNION-based attacks even if not explicitly blocked
  if (/UNION\s+(ALL\s+)?SELECT/i.test(upperSql)) {
    return {
      isValid: false,
      error: 'SQL contains potential UNION-based query which is not allowed'
    };
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

  // Check for potential GROUP BY issues
  if (upperSql.includes('GROUP BY')) {
    const selectMatch = upperSql.match(/SELECT\s+(.*?)\s+FROM/i);
    const groupByMatch = upperSql.match(/GROUP BY\s+(.*?)(?:\s+|$)/i);
    
    if (selectMatch && groupByMatch) {
      const selectPart = selectMatch[1];
      const groupByPart = groupByMatch[1];
      
      // Check if SELECT contains aggregate functions
      const hasAggregates = /COUNT\(|SUM\(|AVG\(|MAX\(|MIN\(|COUNT\*\(/i.test(selectPart);
      
      if (hasAggregates) {
        // Extract non-aggregate columns from SELECT
        const selectColumns = selectPart.split(/\s*,\s*/);
        for (const col of selectColumns) {
          const cleanCol = col.trim().replace(/\s+AS\s+\w+$/i, ''); // Remove aliases
          if (!/COUNT\(|SUM\(|AVG\(|MAX\(|MIN\(|COUNT\*\(/i.test(cleanCol) && !groupByPart.includes(cleanCol.trim())) {
            return {
              isValid: false,
              error: `Column '${cleanCol.trim()}' in SELECT must be in GROUP BY clause when using aggregate functions`
            };
          }
        }
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