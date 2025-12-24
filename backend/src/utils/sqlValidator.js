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
      error: 'Security restriction: Only SELECT statements are allowed. This system is read-only and does not allow data modification operations like INSERT, UPDATE, or DELETE. You can ask questions like "show all orders" or "show customer data".',
      securityIssue: true
    };
  }

  // Check for blocked keywords
  for (const keyword of BLOCKED_KEYWORDS) {
    // Check for exact word boundaries to prevent bypass attempts
    const regex = new RegExp(`\b${keyword}\b`, 'i');
    if (regex.test(upperSql)) {
      return {
        isValid: false,
        error: `Security restriction: Blocked keyword found in query: ${keyword}. This system is read-only and does not allow data modification operations. You can ask questions like "show all orders" or "show customer information".`,
        securityIssue: true
      };
    }
  }

  // Additional security checks
  // Check for comment patterns that might be used to bypass validation
  if (/(\/\*|\*\/|--|#)/.test(sql)) {
    return {
      isValid: false,
      error: 'Security restriction: SQL comments are not allowed in queries. Comments could potentially be used to hide malicious code. You can ask natural language questions like "show me orders by region" or "show customer data".',
      securityIssue: true
    };
  }

  // Check for potential UNION-based attacks even if not explicitly blocked
  if (/UNION\s+(ALL\s+)?SELECT/i.test(upperSql)) {
    return {
      isValid: false,
      error: 'Security restriction: UNION queries are not allowed. UNION operations can be used to access unauthorized data by combining results from different tables. You can ask questions about individual tables like "show customer orders" or "show sales by region".',
      securityIssue: true
    };
  }

  // Check that all tables are in allowed list
  const tableMatches = upperSql.match(/\bFROM\s+([A-Za-z_][A-Za-z0-9_]*)\b|\bJOIN\s+([A-Za-z_][A-Za-z0-9_]*)\b/gi);
  if (tableMatches) {
    for (const match of tableMatches) {
      const tableName = match.replace(/\b(FROM|JOIN)\s+/i, '').trim();
      if (!ALLOWED_TABLES.includes(tableName.toLowerCase())) {
        // Provide more specific messages for common system tables
        if (tableName.toLowerCase().includes('information_schema') || tableName.toLowerCase().includes('pg_') || tableName.toLowerCase().includes('sys')) {
          return {
            isValid: false,
            error: `Security restriction: Access to system tables like ${tableName} is not allowed for security reasons. Only business data tables are accessible. You can ask questions about orders, customers, or products like "show all customers" or "show order totals".`,
            securityIssue: true
          };
        } else {
          return {
            isValid: false,
            error: `Security restriction: Query references table '${tableName}' which is not in the allowed list. Only 'orders', 'customers', and 'products' tables are accessible. You can ask questions like "show customer orders" or "show product sales".`,
            securityIssue: true
          };
        }
      }
    }
  }

  // Check for potential GROUP BY issues
  if (upperSql.includes('GROUP BY')) {
    const selectMatch = upperSql.match(/SELECT\s+(.*?)\s+(FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT)/i);
    const groupByMatch = upperSql.match(/GROUP BY\s+(.*?)(?:\s+|\s*(?:HAVING|ORDER BY|LIMIT|$))/i);
    
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
          // Remove table prefixes (e.g., 'table.column' -> 'column')
          const colName = cleanCol.split('.').pop().trim();
          const groupByCols = groupByPart.split(/\s*,\s*/).map(c => c.trim());
          
          if (!/COUNT\(|SUM\(|AVG\(|MAX\(|MIN\(|COUNT\*\(/i.test(cleanCol) && !groupByCols.some(gbc => gbc.includes(colName))) {
            return {
              isValid: false,
              error: `Column '${colName}' in SELECT must be in GROUP BY clause when using aggregate functions`,
              securityIssue: false  // This is a syntax issue, not a security issue
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