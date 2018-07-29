const postgres = require('../config/postgres.js');//objeto el objeto de conexión

let taskModel = {};

taskModel.getTasks = async (callback) =>
{	

	if(await postgres.connect()){
	
		let sql = 'SELECT * FROM tasks ORDER BY id';
		
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
}


taskModel.getTask = async (taskId, callback) =>
{
	if(await postgres.connect())
	{
		let sql = `SELECT * FROM tasks WHERE id = ${taskId}`;

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
}

taskModel.insertTask = async (tasksData, callback) =>
{
	if(await postgres.connect())
	{	
		let sql = `INSERT INTO tasks (title, content) VALUES ('${tasksData.title}', '${tasksData.content}')`;
		
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
}


taskModel.updateTask = async (tasksData, callback) =>
{	
	if(await postgres.connect())
	{
		let sql = `UPDATE tasks 
			   SET title = '${tasksData.title}',
			   content = '${tasksData.content}' 	
			   WHERE id = '${tasksData.id}'	
		`;

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
}


taskModel.deleteTask = async (taskId, callback) =>
{
	if (await postgres.connect())
	{
		let sql = `SELECT * FROM tasks WHERE id = ${taskId}`;

		let row = await postgres.query(sql);
			
		if (row.rowCount > 0)
		{	
			let sqlDelete = `DELETE FROM tasks WHERE id = ${taskId}`;
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
	
}

module.exports = taskModel;