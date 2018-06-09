const mysql = require('mysql');


module.exports = () =>{

return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jorge',
    database: 'mevn',
    port: 3306
  });
}