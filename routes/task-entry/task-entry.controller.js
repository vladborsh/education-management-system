var TaskEntry = require('../../models/task-entry.model');
var TaskResult = require('../../models/task-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.assign = assign;
module.exports.results = results;

function getAll(req, res) {
	TaskEntry
	.find()
	.populate({
		path: '_student ', 
		populate: { path: '_user' }
	})
	.populate({
		path: '_task '
	})
	.populate({
		path: '_courseEntry',
		populate: { 
			path: '_lector'
		}
	})
	.populate({
		path: '_courseEntry',
		populate: { 
			path: '_course'
		}
	})
	.exec(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find task ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	TaskEntry
	.findOne({_id : req.params.id})
	.populate('_task')
	.populate({
		path: '_student ', 
		populate: { path: '_user' }
	})
	.exec(function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find task ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var task = new TaskEntry(req.body);
	task.createdDate = Date.now()
	task.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create task' + err});
		} else {
			res.json({success: true, message: 'Task created'})	
		}
	})
}

function update(req, res) {
	TaskEntry.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update task' + err});
		} else {
			res.json({success: true, message: 'Task updated'});
		}
	})
}

function remove (req, res) {
	TaskEntry.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove task ' + err});
		} else {
			res.json({success: true, items: 'Task removed'});
		}
	})
}

function assign (req, res) {
	TaskEntry
	.findOne({_id: req.params.id})
	.exec(function (err, task) {
		task.forStudents.push(req.body.studentId);
		task.save(function (err) {
			if (err) {
				res.json({success: false, message: 'Cannot save task' + err});
			} else {
				res.json({success: true, message: 'Task created'})	
			}
		});
	})
}

function results (req, res) {
	TaskResult
	.find({ _taskEntry : req.params.id})
	.populate({
		path: '_student',
		populate: { path: '_user' }
	})
	.populate({
		path: '_taskEntry',
		populate: { path: '_task' }
	})
	.exec(function (err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select results entries ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

