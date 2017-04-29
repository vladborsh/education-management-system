var Course = require('../../models/course.model');
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
	.populate('_lector _course')
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
	.populate('_lector _course')
	.exec( function (err, course) {
		if (err) {
			res.json({success: false, message: 'Неможливо знайти курс: ' + err});
		} else {
			res.json({success: true, item: course });
		}
	})
}

function create(req, res) {
	var course = new CourseEntry(req.body);
	course.createdDate = Date.now();
	Course.findById(course._course)
	.exec( function (err, mainCourse) {
		if (err) {
			res.json({success: false, message: 'Неможливо знайти курс: ' + err});
		} else {
			var dt = new Date(course.startDate);
			course.name = mainCourse.name + '-' + dt.getMonth() + '-' + dt.getFullYear() 
			course.save(function (err, course) {
				if (err) {
					res.json({success: false, message: 'Неможливо створити курс: ' + err});
				} else {
					res.json({success: true, message: 'Курс успішно створений', id: course._id})	
				}
			})
		}
	})
}

function update(req, res) {
	req.body.updatedDate = Date.now();
	CourseEntry.findByIdAndUpdate(req.params.id, req.body, function(err, course) {
		if (err) {
			res.json({success: false, message: 'Неможливо оновити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно оновлений', id: course._id});
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
	.populate({
		path: '_student ', 
		populate: { path: '_user' }
	})
	.populate({
		path: '_task '
	})
	.populate({
		path: '_courseEntry '
	})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
		} else {
			if (err) {
				res.json({success: false, message: 'Неможливо вилучити завдання для данного курсу: ' + err});
			} else {
				res.json({success: true, items: items});
			}
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