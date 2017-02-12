var User = require('../../models/user.model');
var jwt = require('jsonwebtoken');
var secret = require('../../config/dev.config').secret;

module.exports.getAllUsers = getAllUsers;
module.exports.signup = signup;
module.exports.deleteUser = deleteUser;
module.exports.auth = auth;

function getAllUsers(req, res) {
	User.find(function (err, users) {
		res.send(users);
	});
}

function signup(req,res) {
	var user = new User();
	user.password = req.body.password;
	user.email = req.body.email;
	user.lastName = req.body.lastName;
	user.firstName = req.body.firstName;
	user.save(function (err) {
		if (err) {
			res.json({success:false, message: 'Cannot create user'});
		} else {
			res.json({success:true, message: 'User created'});
		}
	});
}

function deleteUser(req, res) {
	User.remove(function (err) {
		if(err) {
			res.json({success: false, message: 'Cannot remove'});
		} else {
			res.json({success: true, message: 'All users delted'})
		}
	})
}

function auth (req, res) {
	User
	.findOne({ email: req.body.email })
	.select('email password _id')
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
					token: token
				});
			}
		}
	})
}