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
	CourseEntry.find()
	.populate('_lector')
	.populate('_course')
	.exec(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Неможливо знайти курси: ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	CourseEntry.findById(req.params.id)
	.populate('_lector')
	.populate('_course')
	.exec( function (err, course) {
		if (err) {
			res.json({success: false, message: 'Неможливо знайти курс: ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var course = new CourseEntry(req.body);
	course.createdDate = Date.now();
	course.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Неможливо створити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно створений'})	
		}
	})
}

function update(req, res) {
	req.body.updatedDate = Date.now();
	CourseEntry.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Неможливо оновити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно оновлений'});
		}
	})
}

function remove (req, res) {
	CourseEntry.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Неможливо видалити курс: ' + err});
		} else {
			res.json({success: true, items: 'Курс успішно видалений'});
		}
	})
}

function getTasks (req, res) {
	TaskEntry
	.find({ _courseEntry : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
		} else {
			TaskEntry.populate(items, {path: '_task'}, function (err, doc) {
				if (err) {
					res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
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
			res.json({success: false, message: 'Неможливо вилучити студентів для данного курсу: ' + err});
		} else {
			Student.populate(items, {path: '_user'}, function (err, doc) {
				if (err) {
					res.json({success: false, message: 'Неможливо вилучити студентів для данного курсу: ' + err});
				} else {
					res.json({success: true, items: doc});
				}
			});
		}
	})
}