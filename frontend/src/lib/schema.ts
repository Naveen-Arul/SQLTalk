export const databaseSchema = {
  database: 'analytics_db',
  tables: [
    {
      name: 'orders',
      description: 'Sales transactions and order details',
      columns: [
        { name: 'order_id', type: 'INTEGER', description: 'Unique order identifier' },
        { name: 'order_date', type: 'DATE', description: 'Date of the order' },
        { name: 'region', type: 'VARCHAR', description: 'Geographic region' },
        { name: 'category', type: 'VARCHAR', description: 'Product category' },
        { name: 'product', type: 'VARCHAR', description: 'Product name' },
        { name: 'quantity', type: 'INTEGER', description: 'Units ordered' },
        { name: 'unit_price', type: 'DECIMAL', description: 'Price per unit' },
        { name: 'total_amount', type: 'DECIMAL', description: 'Total order value' },
      ],
    },
    {
      name: 'customers',
      description: 'Customer information and demographics',
      columns: [
        { name: 'customer_id', type: 'INTEGER', description: 'Unique customer identifier' },
        { name: 'customer_name', type: 'VARCHAR', description: 'Full name' },
        { name: 'region', type: 'VARCHAR', description: 'Customer location' },
        { name: 'customer_type', type: 'VARCHAR', description: 'B2B or B2C classification' },
      ],
    },
    {
      name: 'products',
      description: 'Product catalog and pricing',
      columns: [
        { name: 'product_id', type: 'INTEGER', description: 'Unique product identifier' },
        { name: 'product_name', type: 'VARCHAR', description: 'Product name' },
        { name: 'category', type: 'VARCHAR', description: 'Product category' },
        { name: 'base_price', type: 'DECIMAL', description: 'Base retail price' },
      ],
    },
  ],
};

export const sampleQueries = [
  'Show total revenue by category',
  'Monthly sales trend for 2025',
  'Top 5 products by revenue',
  'Average order value by region',
  'Customer count by type',
  'Daily orders for last week',
];
