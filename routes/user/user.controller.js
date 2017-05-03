var User = require('../../models/user.model');
var Student = require('../../models/student.model');
var jwt = require('jsonwebtoken');
var secret = require('../../config/dev.config').secret;

module.exports.getAllUsers = getAllUsers;
module.exports.get = get;
module.exports.update = update;
module.exports.getInfo = getInfo;
module.exports.signup = signup;
module.exports.remove = remove;
module.exports.auth = auth;
module.exports.role = role;
module.exports.getAdmins = getAdmins;
module.exports.getTeachers = getTeachers;
module.exports.getStudents = getStudents;
module.exports.getStudentItemsForUser = getStudentItemsForUser;


function getAllUsers(req, res) {
	var userData = req.decoded;
	User.find()
	.select('email role firstName lastName _id createdDate')
	.exec(function (err, users) {
		if (err) {
			res.json({success:false, message: 'Could not found users'});
		}
		for (var i=0; i< users.length; i++) {
			if (users[i] && users[i]._id == userData._id) {
				users.splice(i, 1)
			}
		}
		res.send(users);
	});
}

function get(req, res) {
	User
	.findOne({ _id: req.params.id })
	.select('email role firstName lastName _id createdDate')
	.exec(function (err, user) {
		if (err) {
			res.json({success:false, message: 'Could not found user'});
		}
		if (!user) {
			res.json({success:false, message: 'Could not authenticate user'});
		} else {
			res.json(user);/**/
		}
	})
}

function update(req, res) {
	User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
		if (err) {
			res.json({success: false, message: 'Неможливо оновити користувача: ' + err});
		} else {
			res.json({success: true, message: 'Користвач успішно оновлений', user: user});
		}
	})
}

function signup(req,res) {
	User.find(function (err, users) {
		var role = 'Student';
		if (users.length == 0) {
			role = 'Admin';
		} 
		var user = new User(req.body);
		user.createdDate = Date.now();
		user.role = role;
		user.save(function (err) {
			if (err) {
				res.json({success:false, message: 'Cannot create user. Error: ' + err});
			} else {
				res.json({success:true, message: 'User created'});
			}
		});
	});
	
}

function remove(req, res) {
	User.findById(req.params.id, function (err, item) {
		if (err) {
			res.json({success: false, message: 'Cannot remove ' + err});
		} else {
			item.remove();
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
	.select('email firstName lastName _id createdDate')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}

function getTeachers(req, res) {
	User
	.find({ $or : [ {role:'Admin'}, {role:'Teacher'} ] })
	.select('email firstName lastName _id createdDate')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}

function getStudents(req, res) {
	var selector = {
		role:'Student'
	}
	if (req.query.name) {
		var selector = {
			'$and' : [ /**/
				{ role : 'Student' } ,
				{'$or' : [
					{firstName : {$regex : new RegExp(".*" + req.query.name + ".*", "i") }},
					{lastName : {$regex : new RegExp(".*" + req.query.name + ".*", "i") }}
				]}
			]
		}
	}
	User
	.find(selector)
	.select('email firstName lastName _id createdDate')
	.exec(function (err, users) {
		if (err) throw err;
		res.json({ success: true, users: users});
	})
}


function getInfo (req, res) {
	var userData = req.decoded;
	User
	.findOne({ _id: userData._id })
	.select('role firstName lastName _id')
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

function getStudentItemsForUser (req, res) {
	Student
	.find({_user : req.params.id})
	.populate({
		path : '_courseEntry',
		populate : { path: '_course' }
	}) 
	.exec( function (err, courses) {
		if (err) {
			res.json({success: false, message: 'Cannot find courses ' + err});
		} else {
			res.json(courses);
		}
	})
}