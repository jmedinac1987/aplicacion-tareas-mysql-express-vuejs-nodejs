const { Pool } = require('pg');
const postgres = new Pool({
  connectionString: process.env.DATABASE_URL,
  // maximum number of clients the pool should contain
  max: 60,
  ssl: true  
});

 module.exports = postgres;