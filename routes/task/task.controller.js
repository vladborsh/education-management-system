var Task = require('../../models/task.model');
var Test = require('../../models/test.model').test;
var Work = require('../../models/work.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTests = getTests;
module.exports.getWorks = getWorks;

function getAll(req, res) {
	var selector = {}
	if (req.query.name) {
		selector.name = {$regex : new RegExp(".*" + req.query.name + ".*", "i") }
	}
	Task.find(selector)
	.populate('_course')
	.exec(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find tasks ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Task.findById(req.params.id)
	.populate('_course')
	.exec(function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find task ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var task = new Task(req.body);
	task.createdDate = Date.now();
	task.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create task ' + err});
		} else {
			res.json({success: true, message: 'Task created'})	
		}
	})
}

function update(req, res) {
	Task.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update task ' + err});
		} else {
			res.json({success: true, message: 'Task updated'});
		}
	})
}

function remove (req, res) {
	Task.findById(req.params.id, function (err, item) {
		if (err) {
			res.json({success: false, message: 'Cannot remove task ' + err});
		} else {
			item.remove();
			res.json({success: true, items: 'Task removed'});
		}
	})
}

function getTests (req, res) {
	Test
	.find({_task: req.params.id})
	.select('_id questions _task')
	.populate('questions')
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find tests ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getWorks (req, res) {
	Work
	.find({_task: req.params.id})
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find works ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}


