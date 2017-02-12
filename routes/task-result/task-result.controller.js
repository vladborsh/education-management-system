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
	TaskResult.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find task results ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	TaskResult.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find task result ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var tasResult = new TaskResult();
	tasResult._taskEntry = req.body._taskEntry;
	tasResult._student = req.body._student;
	tasResult.comment = req.body.comment;
	tasResult.createdDate = req.body.createdDate;
	tasResult.mark = req.body.mark;
	tasResult.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create task result' + err});
		} else {
			res.json({success: true, message: 'Task result created'})	
		}
	})
}

function update(req, res) {
	TaskResult.findByIdAndUpdate(req.params.id, req.body, function(arr) {
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
}


