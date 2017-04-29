var Course = require('../../models/course.model');
var Task = require('../../models/task.model');
var Lecture = require('../../models/lecture.model');
var CourseEntry = require('../../models/course-entry.model');

module.exports.getAll = getAll;
module.exports.get = get;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
module.exports.upView = upView;
module.exports.getTasks = getTasks;
module.exports.getLectures = getLectures;
module.exports.getEntries = getEntries;

function getAll(req, res) {
	Course.find()
	.select('_id _author name description active createdDate updatedDate')
	.populate('_author')
	.exec(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Неможливо створити курс: ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Course.findById(req.params.id)
	.select('_id _author name description active createdDate updatedDate')
	.populate('_author')
	.exec( function (err, course) {
		if (err) {
			res.json({success: false, message: 'Неможливо знайти курс: ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var course = new Course(req.body);
	course.createdDate = Date.now();
	course.save(function (err, course) {
		if (err) {
			res.json({success: false, message: 'Неможливо створити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно створений', id: course._id})	
		}
	})
}

function update(req, res) {
	req.body.updatedDate = Date.now();
	Course.findByIdAndUpdate(req.params.id, req.body, function(err) {
		if (err) {
			res.json({success: false, message: 'Неможливо оновити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно оновлений'});
		}
	})
}

function remove (req, res) {
	Course.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Неможливо видалити курс: ' + err});
		} else {
			res.json({success: true, items: 'Курс успішно видалений'});
		}
	})
}

function upView(req, res) {
	Course.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, function(arr) {
		if (err) {
			res.json({success: false, message: 'Неможливо оновити курс: ' + err});
		} else {
			res.json({success: true, message: 'Курс успішно оновлений'});
		}
	})
}

function getTasks (req, res) {
	Task
	.find({_course : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Неможливо вилучити завдання для курсу: ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getLectures (req, res) {
	Lecture
	.find({_course : req.params.id})
	.select('_id _course name description body links createdDate')
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Неможливо вилучити лекції для курсу: ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getEntries (req, res) {
	CourseEntry
	.find({_course : req.params.id})
	.select('_id _course _lector name startDate endDate active grade views createdDate updatedDate deactivateReson')
	.populate('_lector')
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Неможливо вилучти курси за цим напрямком: ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

