var CourseEntry = require('../../models/course-entry.model');
var TaskEntry = require('../../models/task-entry.model');
var Student = require('../../models/student.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTasks = getTasks;
module.exports.getStudents = getStudents;

function getAll(req, res) {
	CourseEntry.find(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find courses ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	CourseEntry.findById(req.params.id, function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find course ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var course = new CourseEntry();
	course._course = req.body._course;
	course.sartDate = req.body.sartDate;
	course.endDate = req.body.endDate;
	course.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create course' + err});
		} else {
			res.json({success: true, message: 'Course created'})	
		}
	})
}

function update(req, res) {
	CourseEntry.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update course' + err});
		} else {
			res.json({success: true, message: 'Course updated'});
		}
	})
}

function remove (req, res) {
	CourseEntry.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove course ' + err});
		} else {
			res.json({success: true, items: 'Course removed'});
		}
	})
}

function getTasks (req, res) {
	TaskEntry
	.find({ _courseEntry : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select tasks ' + err});
		} else {
			TaskEntry.populate(items, {path: '_task'}, function (err, doc) {
				if (err) {
					res.json({success: false, message: 'Cannot select tasks ' + err});
				} else {
					res.json({success: true, items: doc});
				}
			});
		}
	})
}

function getStudents (req, res) {
	Student
	.find({ _courseEntry : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select students ' + err});
		} else {
			Student.populate(items, {path: '_user'}, function (err, doc) {
				if (err) {
					res.json({success: false, message: 'Cannot select students ' + err});
				} else {
					res.json({success: true, items: doc});
				}
			});
		}
	})
}