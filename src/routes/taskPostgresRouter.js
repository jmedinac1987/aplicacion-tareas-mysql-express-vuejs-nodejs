const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskPostgresModel');


router.get('/', (req, res) =>{
	taskModel.getTasks( async (err, data) =>{
		if(!err)
		{
			await res.json(data);
		}
		else
		{
			await res.status(500).json({
				success: false,
				message: 'Error, get tasks!'				
			});
		}
	});
});

router.get('/:id', (req, res) =>{
	taskModel.getTask(req.params.id, async (err, data) =>{
		if(!err)
		{
			await res.json(data);
		}
		else
		{
			await res.status(500).json({
				success: false,
				message: 'Error, get tasks!'				
			});
		}
	});
});

router.post('/', (req, res) =>
{
	const tasksData = {		
		title: req.body.title,
		content: req.body.content
	}

	taskModel.insertTask(tasksData, async (err, data) =>{
		
		
		if(data.status === 200)
		{	
			await res.json({
				success: true,
				message: 'Tasks Insert Ok!'
			});
		}
		else
		{
			await res.status(500).json({
				success: false,
				message: 'Error, insert tasks!'				
			});
		}
	});
});

router.put('/:id', (req, res) =>{
	
	const tasksData = {
		id: req.params.id,
		title: req.body.title,
		content: req.body.content	
	}

	taskModel.updateTask(tasksData, async (err, data) =>{
		if(data.message)
		{	
			await res.json(data);
		}
		else
		{
			await res.status(500).json({
				success: false,
				message: 'Error, update tasks!'				
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	
	taskModel.deleteTask(req.params.id, async (err, result) =>{
		if(!err)
		{
			await res.json(result);
		}
		else
		{
			await res.status(500).json({message: 'Error, delete tasks!'});	
		}
	});
});

module.exports = router;//se importa el objeto router 
