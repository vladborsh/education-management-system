var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var secret = require('../config/dev.config').secret;

exports.isAuthenticated = isAuthenticated;
exports.isAdmin = isAdmin;
exports.isTeacher = isTeacher;

function isAuthenticated(req,res,next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		res.status(403).json({message: 'Forbidden'});
	} else {
		jwt.verify(token, secret, function (err, decoded) {
			if (err) { 
				res.status(403).json({message: 'Forbidden'});
			} else {
				req.decoded = decoded;
				next();
			}
		})
	}
}

function isAdmin(req, res, next) {
	var userData = req.decoded;
	if (!userData) {
		res.status(403).json({message: 'Forbidden'});
	} else {
		User.findById(userData._id, 'role', function(err, user) {
			if (err) { 
				return res.status(403).json({message: 'Forbidden'});
			}
			if (!user) {
				return res.status(401).json({message: 'Unauthorized'});
			}
			if (user.role === 'Admin') {
				next();
			} else {
				return res.status(401).json({message: 'Unauthorized'});
			}
		});
	}
}

function isTeacher(req, res, next) {
	var userData = req.decoded;
	if (!userData) {
		res.status(403).json({message: 'Forbidden'});
	} else {
		User.findById(userData._id, 'role', function(err, user) {
			if (err) { 
				return res.status(403).json({message: 'Forbidden'});
			}
			if (!user) {
				return res.status(401).json({message: 'Unauthorized'});
			}
			if (user.role === 'Teacher' || user.role === 'Admin') {
				next();
			} else {
				return res.status(401).json({message: 'Unauthorized'});
			}
		});
	}
}
