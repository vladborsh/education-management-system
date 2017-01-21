var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://lms-user:qweasdzxc@ds117899.mlab.com:17899/lms-db", ['tasks']);

// get all tasks
router.get('/tasks', function (req, res, next) {
	db.tasks.find(function (err, tasks) {
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	})
})


// get single task
router.get('/tasks/:id', function (req, res, next) {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
	})
})

// save task
router.post('/tasks', function (req, res, next) {
	var task = req.body;
	if(!task.title || (task.isDone + '')) {
		res.status(400);
		res.json({
			"error" : "bad data"
		});
	} else {
		db.tasks.save(task, function (err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		})
	}
});

// delete task
router.delete('/tasks/:id', function (req, res, next) {
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, task) {
		if(err) {
			res.send(err);
		}
		res.json(task);
	})
});

// update task
router.put('/tasks/:id', function (req, res, next) {
	var task = rq.body;
	var ipdTask = {};

	if (task.isDone) {
		updTask.isDone = task.isDone;
	}
	if (task.title) {
		updTask.title = task.title;
	}

	if(!updTask) {
		res.status(400);
		res.json({
			"error" : "bad data"
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, function (err, task) {
			if(err) {
				res.send(err);
			}
			res.json(task);
		})
	}

	
});

module.exports = router;