const { Pool } = require('pg');
const postgres = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:jorge@localhost/mevn'
});

 module.exports = postgres;