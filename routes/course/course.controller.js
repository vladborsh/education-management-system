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
	.populate('_author')
	.exec(function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find courses ' + err});
		} else {
			res.json(courses);
		}
	})
}

function get(req, res) {
	Course.findById(req.params.id)
	.populate('_author')
	.exec( function (err, course) {
		if (err) {
			res.json({success: false, message: 'Cannot find course ' + err});
		} else {
			res.json(course);
		}
	})
}

function create(req, res) {
	var course = new Course(req.body);
	course.createdDate = Date.now();
	course.save(function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot create course' + err});
		} else {
			res.json({success: true, message: 'Course created'})	
		}
	})
}

function update(req, res) {
	req.body.updatedDate = Date.now();
	Course.findByIdAndUpdate(req.params.id, req.body, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update course' + err});
		} else {
			res.json({success: true, message: 'Course updated'});
		}
	})
}

function remove (req, res) {
	Course.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove course ' + err});
		} else {
			res.json({success: true, items: 'Course removed'});
		}
	})
}

function upView(req, res) {
	Course.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, function(arr) {
		if (err) {
			res.json({success: false, message: 'Cannot update course' + err});
		} else {
			res.json({success: true, message: 'Course updated'});
		}
	})
}

function getTasks (req, res) {
	Task
	.find({_course : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select tasks ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getLectures (req, res) {
	Lecture
	.find({_course : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select lectures ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

function getEntries (req, res) {
	CourseEntry
	.find({_course : req.params.id})
	.exec(function(err, items) {
		if (err) {
			res.json({success: false, message: 'Cannot select course entries ' + err});
		} else {
			res.json({success: true, items: items});
		}
	})
}

