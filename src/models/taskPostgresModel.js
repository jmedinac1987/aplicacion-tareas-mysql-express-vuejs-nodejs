const postgres = require('../config/postgres.js');//objeto el objeto de conexión

let taskModel = {};

taskModel.getTasks = async (callback) =>
{	
	try {

		if(await postgres.connect()){
		
			let sql = 'SELECT * FROM tasks ORDER BY id DESC';
			
			await postgres.query(sql, (err, rows) =>{
								if (err) 
								{
									throw err;
								}
								else
								{
									callback(null, rows);
								}
						});	
			}

	} catch(e) {
	  console.log(e.stack);
	}
}


taskModel.getTask = async (taskId, callback) =>
{	
	try {
	
		if(await postgres.connect())
		{	
			let sql = {
 					 		text: 'SELECT * FROM tasks WHERE id = $1',
  							values: [`${taskId}`]
					  }

			//let sql = `SELECT * FROM tasks WHERE id = ${taskId}`;

			await postgres.query(sql, (err, rows) =>{
							if (err) 
							{
								throw err;
							}
							else
							{
								callback(null, rows);
							}
			});	
		}

	} catch(e) {
	  console.log(e.stack);
	}
}

taskModel.insertTask = async (tasksData, callback) =>
{	
	try {
	
	
		if(await postgres.connect())
		{	
			let sql = {
 						 text: 'INSERT INTO tasks (title, content) VALUES($1, $2)',
  						 values: [`${tasksData.title}`, `${tasksData.content}`]
					  }

			//let sql = `INSERT INTO tasks (title, content) VALUES ('${tasksData.title}', '${tasksData.content}')`;
			
			await postgres.query(sql, (err, result) =>
			{
				if (err) 
				{
					throw err;
				}
				else
				{
					callback(null, {
						'status' : 200
					});
				}
			});
		}

	} catch(e) {
	
		console.log(e.stack);
	}
}


taskModel.updateTask = async (tasksData, callback) =>
{	
	try {

				
		if(await postgres.connect())
		{	
			let sql = {
					 	text: 'UPDATE tasks SET title = $1, content = $2 WHERE id = $3',
						values: [`${tasksData.title}`, `${tasksData.content}`, `${tasksData.id}`]
				  	  }

			/*let sql = `UPDATE tasks 
				   SET title = '${tasksData.title}',
				   content = '${tasksData.content}' 	
				   WHERE id = '${tasksData.id}'	
			`;*/

			await postgres.query(sql, (err, result) =>{
				if (err) 
				{
					throw err;
				}
				else
				{
					callback(null, {
						'message' : 'success'
					});
				}
			});
		}

	} catch(e) {
	
		console.log(e.stack);
	}
}


taskModel.deleteTask = async (taskId, callback) =>
{	
	try {
		
		if (await postgres.connect())
		{
			let sql = {
 					 		text: 'SELECT * FROM tasks WHERE id = $1',
  							values: [`${taskId}`]
					  }

			let row = await postgres.query(sql);
				
			if (row.rowCount > 0)
			{	
				let sqlDelete = {
					 		text: 'DELETE FROM tasks WHERE id = $1',
							values: [`${taskId}`]
						  }
				//let sqlDelete = `DELETE FROM tasks WHERE id = ${taskId}`;
				await postgres.query(sqlDelete, (err, result) =>{
						if (err) 
						{
							throw err;
						}
						else 
						{
							callback(null, {'msg':'deleted'});	
						}
					})
			}
			else 
			{
				callback(null, {'msg':'not exists'});	
			}
		}
	
	} catch(e) {
		console.log(e.stack);
	}
}

module.exports = taskModel;