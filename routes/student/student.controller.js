var Student = require('../../models/student.model');
var TaskEntry = require('../../models/task-entry.model');
var TaskResult = require('../../models/task-result.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTasks = getTasks;
module.exports.getResults = getResults;

function getAll(req, res) {
	Student
	.find()
	.populate('_user') 
	.exec( function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find courses ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Student
	.findById(req.params.id)
	.populate('_user') 
	.exec( function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find course ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var student = new Student(req.body);
	Student.find({ _courseEntry : req.body._courseEntry, _student : req.body._student}, function (err, items) {
		if (items.length == 0) {
			student.save(function (err) {
				if (err) {
					res.json({success: false, message: 'Cannot create student' + err});
				} else {
					res.json({success: true, message: 'Student created'})	
				}
			})
		} else {
			res.json({success: false, message: 'Cannot create student. There is already student'});
		}
	})
	
}

function update(req, res) {
	Student.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update student' + err});
		} else {
			res.json({success: true, message: 'Student updated'});
		}
	})
}

function remove (req, res) {
	Student.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove student ' + err});
		} else {
			res.json({success: true, items: 'Student removed'});
		}
	})
}

function getTasks (req, res) {
	TaskEntry
	.find({forStudents : req.params.id})
	.populate('_task')
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select tasks ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getResults (req, res) {
	TaskResult
	.find({_student : req.params.id})
	.populate({
		path : '_taskEntry',
		populate : { path:'_task' }
	})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select results ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}
