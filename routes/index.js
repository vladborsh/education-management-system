var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = function(app) {

	app.use('/api/user', require('./user/user.route'));
	app.use('/api/course', require('./course/course.route'));
	app.use('/api/course_e', require('./course-entry/course-entry.route'));
	app.use('/api/lecture', require('./lecture/lecture.route'));
	app.use('/api/student', require('./student/student.route'));
	app.use('/api/task_e', require('./task-entry/task-entry.route'));

	app.get('/*', function(req, res) {
		res.sendfile('index.html', {
			root: path.join(__dirname, './client')
		})
	});

}