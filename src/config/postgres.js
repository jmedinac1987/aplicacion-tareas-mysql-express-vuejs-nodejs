const { Pool } = require('pg');
const stringPostgres = 'postgres://postgres:jorge@localhost/mevn';
const connection = process.env.DATABASE_URL || stringPostgres;
const sslConfirm = (connection === stringPostgres) ? false : true;


const postgres = new Pool({
  connectionString: connection,
  // maximum number of clients the pool should contain
  max: 60,
  ssl: sslConfirm //true cuando se sube a un servidor como el de Heroku
});

 module.exports = postgres;