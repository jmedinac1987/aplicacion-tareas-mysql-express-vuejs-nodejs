const { Pool } = require('pg');
const postgres = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:jorge@localhost/mevn',
  // maximum number of clients the pool should contain
  max: 60  
});

 module.exports = postgres;