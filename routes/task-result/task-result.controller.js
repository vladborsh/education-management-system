var TaskResult = require('../../models/task-result.model');
var TestResult = require('../../models/test-result.model');
var WorkResult = require('../../models/work-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTests = getTests;
module.exports.getWorks = getWorks;

function getAll(req, res) {
	TaskResult
	.find()
	.populate({
		path: '_taskEntry',
		populate: { path: '_task' }
	})
	.populate({
		path: '_student ', 
		populate: { path: '_user' }
	})
	.exec(function (err, tasks) {
		if (err) {
			res.json({success: false, message: 'Cannot find task results ' + err});
		} else {
			res.json(tasks);
		}
	})
}

function get(req, res) {
	TaskResult
	.findById(req.params.id)
	.populate({
		path: '_taskEntry',
		populate: { path: '_task' }
	})
	.populate({
		path: '_student ', 
		populate: { path: '_user' }
	})
	.exec(function (err, task) {
		if (err) {
			res.json({success: false, message: 'Cannot find task result ' + err});
		} else {
			res.json(task);
		}
	})
}

function create(req, res) {
	var tasResult = new TaskResult(req.body);
	tasResult.createdDate = Date.now();
	tasResult.save(function (err, task_result) {
		if (err) {
			res.json({success: false, message: 'Cannot create task result' + err});
		} else {
			res.json({success: true, message: 'Task result created', task_result: task_result})	
		}
	})
}

function update(req, res) {
	TaskResult.findByIdAndUpdate(req.params.id, req.body, function(err) {
		if (err) {
			res.json({success: false, message: 'Cannot update task result' + err});
		} else {
			res.json({success: true, message: 'Task result updated'});
		}
	})
}

function remove (req, res) {
	TaskResult.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove task result ' + err});
		} else {
			res.json({success: true, items: 'Task result removed'});
		}
	})
}

function getTests (req, res) {
	TestResult
	.find({_taskResult: req.params.id})
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find tests ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getWorks (req, res) {
	WorkResult
	.find({_taskResult: req.params.id})
	.exec( function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot find works ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}


