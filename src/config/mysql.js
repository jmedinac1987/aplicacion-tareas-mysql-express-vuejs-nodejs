const mysql = require('mysql');


module.exports = () =>{

return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mevn',
    port: 3306
  });
}