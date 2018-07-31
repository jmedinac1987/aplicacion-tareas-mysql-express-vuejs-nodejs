const mysql = require('../config/mysql'); //objeto el objeto de conexión
const connection = mysql();
let taskModel = {};

taskModel.getTask = (taskId, callback) => {
    if (connection) {
        let sql = `SELECT * FROM tasks WHERE id = ${connection.escape(taskId)}`;
        connection.query(sql, (err, row) => {
            if (err) {
                throw err;
            } else {
                callback(null, row);
            }
        });
    }
}

taskModel.getTasks = (callback) => {
    if (connection) {
        let sql = "SELECT * FROM tasks";
        connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        });
    }
}

taskModel.insertTask = (tasksData, callback) => {
    if (connection) {
        let sql = "INSERT INTO tasks SET ?"
        connection.query(sql, tasksData, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    'insertId': result.insertId
                });
            }
        });
    }
}

taskModel.updateTask = (tasksData, callback) => {
    if (connection) {
        let sql = `UPDATE tasks 
			   SET title = ${connection.escape(tasksData.title)},
			   content = ${connection.escape(tasksData.content)} 	
			   WHERE id = ${connection.escape(tasksData.id)}	
		`;
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback(null, {
                    'message': 'success'
                });
            }
        });
    }
}

taskModel.deleteTask = (taskId, callback) => {
    if (connection) {
        let sql = `SELECT * FROM tasks WHERE id = ${connection.escape(taskId)}`;
        connection.query(sql, (err, row) => {
            if (row.length > 0) {
                let sqlDelete = `DELETE FROM tasks WHERE id = ${connection.escape(taskId)}`;
                connection.query(sqlDelete, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            'msg': 'deleted'
                        });
                    }
                })
            } else {
                callback(null, {
                    'msg': 'not exists'
                });
            }
        });
    }
}

module.exports = taskModel;