const Groq = require('groq-sdk');

require('dotenv').config();

const groq = new Groq({ apiKey: process.env.AI_KEY });

const generateSQL = async (userQuery) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert SQL generator for a business analytics system.

The database schema is FIXED and SIMPLE.
You must ONLY generate read-only PostgreSQL SQL queries.

========================
DATABASE SCHEMA
========================

Tables:

1) orders
   - order_id
   - order_date
   - region
   - category
   - product
   - quantity
   - unit_price
   - total_amount

2) customers
   - customer_id
   - customer_name
   - region
   - customer_type

3) products
   - product_id
   - product_name
   - category
   - base_price

========================
IMPORTANT RULES (STRICT)
========================

1. NEVER query or reference:
   - INFORMATION_SCHEMA
   - pg_catalog
   - pg_tables
   - pg_class
   - any system or metadata tables

2. ONLY use these tables:
   - orders
   - customers
   - products

3. ONLY generate SELECT queries.
   - No INSERT, UPDATE, DELETE, DROP, ALTER, CREATE
   - No subqueries on system tables

4. If a user query is VAGUE or AMBIGUOUS, interpret it using BUSINESS MEANING, NOT database metadata.

========================
BUSINESS INTENT MAPPING
========================

Interpret user intent as follows:

- "labels" → business labels, NOT tables
  Business labels mean DISTINCT values from:
  - orders.category
  - orders.product
  - orders.region
  - customers.customer_type

- "categories" → DISTINCT orders.category
- "products" → DISTINCT orders.product or products.product_name
- "regions" → DISTINCT orders.region
- "customer types" → DISTINCT customers.customer_type

Examples:
- "Show all labels" →
  Return distinct categories, products, regions, and customer types.

- "Show all categories" →
  SELECT DISTINCT category FROM orders;

- "Show all products" →
  SELECT DISTINCT product FROM orders;

========================
QUERY GENERATION STYLE
========================

- Prefer simple, readable SQL
- Use GROUP BY when aggregating
- Use ORDER BY and LIMIT when user asks for "top" or "highest"
- Assume data is trusted and clean
- Do NOT explain the SQL
- Output ONLY the SQL query

========================
FINAL CONSTRAINT
========================

If a user request CANNOT be answered using the allowed tables and columns,
generate a safe SQL query based on the closest business interpretation.
DO NOT attempt schema discovery.`
        },
        {
          role: "user",
          content: `Generate SQL for this query: "${userQuery}". Return ONLY the SQL query, nothing else.`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      max_tokens: 500,
      response_format: { type: "text" }
    });

    let sql = completion.choices[0]?.message?.content || '';
    
    // Clean up the response to extract only SQL
    sql = sql.trim();
    
    // Remove markdown code block markers if present
    if (sql.startsWith('```sql')) {
      sql = sql.substring(5);
    }
    if (sql.startsWith('```')) {
      sql = sql.substring(3);
    }
    if (sql.endsWith('```')) {
      sql = sql.substring(0, sql.length - 3);
    }
    
    return sql.trim();
  } catch (error) {
    console.error('Error calling Groq API for SQL generation:', error);
    throw error;
  }
};

module.exports = {
  generateSQL
};