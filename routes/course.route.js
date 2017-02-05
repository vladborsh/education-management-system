var Course = require('../models/course.model');
var jwt = require('jsonwebtoken');
var secret = require('../config/dev.config').secret;

module.exports = function(router) {

	router.use(function (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		
		if (!token) {
			res.json({success: false, message: 'No token provided'});
		} else {
			jwt.verify(token, secret, function (err, decoded) {
				if (err) { 
					req.json({success: false, message: 'Token Invalid'});
				} else {
					req.decoded = decoded;
				}
			})
		}
	})

	router.get('/courses', function (req, res) {
		Course.find(function (err, courses) {
			res.send(courses)
		})
	})

	router.post('/courses', function (req, res) {
		var course = new Course();
		course._lector = req.body._lector;
		course.name = req.body.name;
		course.description = req.body.description;
		course.save(function (err) {
			if (err) {
				res.json({success: false, message: 'Cannot create course'});
			} else {
				res.json({success: true, message: 'Course created'})	
			}
		})
	})

	return router;

}
