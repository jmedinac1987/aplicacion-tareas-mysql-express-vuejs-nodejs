const { Pool } = require('pg');
const stringPostgres = 'postgres://postgres:jorge@localhost/mevn';
const connection = process.env.DATABASE_URL || stringPostgres;
const sslConfirm = (connection === stringPostgres) ? false : true;//muy importante para heroku


const postgres = new Pool({
  connectionString: connection,
  // maximum number of clients the pool should contain
  max: 20, //El número máximo de clientes que el grupo debe contener de forma predeterminada está establecido en 10. max ?: int,
  idleTimeoutMillis: 30000, //número de milisegundos a esperar antes de que se agote el tiempo de espera al conectar un nuevo cliente de manera predeterminada, esto es 0, lo que significa que no hay tiempo de espera connectionTimeoutMillis ?: int,
  connectionTimeoutMillis: 5000, //número de milisegundos que un cliente debe permanecer inactivo en la agrupación y no ser desprotegido antes de que se desconecte del servidor y el valor predeterminado descartado es 10000 (10 segundos) - establecido en 0 para deshabilitar la desconexión automática del cliente inactivo idleTimeoutMillis ?: int,
  ssl: sslConfirm //true cuando se sube a un servidor como el de Heroku
});

 module.exports = postgres;