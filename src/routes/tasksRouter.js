const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');


router.get('/', (req, res) =>{
	taskModel.getTasks( (err, data) =>{
		if(!err)
		{
			res.json(data);
		}
		else
		{
			res.status(500).json({
				success: false,
				message: 'Error, get tasks!'				
			});
		}
	});
});


router.get('/:id', (req, res) =>{
	taskModel.getTask(req.params.id, (err, data) =>{
		if(!err)
		{
			res.json(data);
		}
		else
		{
			res.status(500).json({
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

	taskModel.insertTask(tasksData, (err, data) =>{
		
		console.log(data.id);

		if(data && data.insertId)
		{	
			res.json({
				success: true,
				message: 'Tasks Insert Ok!',
				data: data
			});
		}
		else
		{
			res.status(500).json({
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

	taskModel.updateTask(tasksData, (err, data) =>{
		if(data && data.message)
		{	
			res.json(data);
		}
		else
		{
			res.status(500).json({
				success: false,
				message: 'Error, update tasks!'				
			});
		}
	});
});

router.delete('/:id', (req, res) => {
	
	taskModel.deleteTask(req.params.id, (err, result) =>{
		if(!err)
		{
			res.json(result);
		}
		else
		{
			res.status(500).json({message: 'Error, delete tasks!'});	
		}
	});
});

module.exports = router;//se importa el objeto router 
