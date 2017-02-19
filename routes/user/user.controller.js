var User = require('../../models/user.model');
var jwt = require('jsonwebtoken');
var secret = require('../../config/dev.config').secret;

module.exports.getAllUsers = getAllUsers;
module.exports.getInfo = getInfo;
module.exports.signup = signup;
module.exports.remove = remove;
module.exports.auth = auth;
module.exports.role = role;
module.exports.getAdmins = getAdmins;
module.exports.getTeachers = getTeachers;
module.exports.getStudents = getStudents;


function getAllUsers(req, res) {
	User.find(function (err, users) {
		res.send(users);
	});
}

function signup(req,res) {
	var user = new User(req.body);
	if (!user.role) {
		user.role = 'Admin';
	}
	user.save(function (err) {
		if (err) {
			res.json({success:false, message: 'Cannot create user'});
		} else {
			res.json({success:true, message: 'User created'});
		}
	});
}

function remove(req, res) {
	User.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.json({success: false, message: 'Cannot remove ' + err});
		} else {
			res.json({success: true, items: 'User removed'});
		}
	})
}

function auth (req, res) {
	User
	.findOne({ email: req.body.email })
	.select('email password role firstName lastName _id')
	.exec(function (err, user) {
		if (err) throw err;
		if (!user) {
			res.json({success:false, message: 'Could not authenticate user'});
		} else {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.json({success:false, message: 'Invalid password'});
			} else {
				var token = jwt.sign({ _id : user._id }, secret, {expiresIn: '24h'});
				res.json({
					success:true, 
					message: 'User authenticated', 
					token: token,
					role: user.role,
					id: user._id,
					username: user.firstName + ' ' + user.lastName
				});
			}
		}
	})
}

function role(req, res) {
	var id = req.decoded._id
	if (!id) {
		res.status(403).json({message: 'Forbidden'});
	}
	User.findById(id, function (err, user) {
		if (err) throw err;
		if (!user) {
			res.json({success:false, message: 'Could not authenticate user'});
		} else {
			res.json({success:success, message: user.role});
		}
	});
}

function getAdmins(req, res) {
	User
	.find({role:'Admin'})
	.select('_id firstName lastName')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}

function getTeachers(req, res) {
	User
	.find({ $or : [ {role:'Admin'}, {role:'Teacher'} ] })
	.select('_id firstName lastName')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}

function getStudents(req, res) {
	User
	.find({role:'User'})
	.select('_id firstName lastName')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}


function getInfo (req, res) {
	var userData = req.decoded;
	User
	.findOne({ _id: userData._id })
	.select('email password role firstName lastName _id')
	.exec(function (err, user) {
		if (err) throw err;
		if (!user) {
			res.json({success:false, message: 'Could not authenticate user'});
		} else {
			res.json({
				role: user.role,
				id: user._id,
				username: user.firstName + ' ' + user.lastName
			});
		}
	})
}