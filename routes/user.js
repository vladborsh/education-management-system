var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'amzingapp';

module.exports = function(router) {

	router.get('/users', function (req, res) {
		User.find(function (err, users) {
			res.send(users);
		});
	})

	router.post('/users', function(req, res){
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
	});

	router.delete('/users', function (req, res) {
		User.remove(function (err) {
			if(err) {
				res.json({success: false, message: 'Cannot remove'});
			} else {
				res.json({success: true, message: 'All users delted'})
			}
		})
	});

	router.post('/auth', function (req, res) {
		User
		.findOne({ email: req.body.email })
		.select('email password')
		.exec(function (err, user) {
			if (err) throw err;
			if (!user) {
				res.json({success:false, message: 'Could not authenticate user'});
			} else {
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({success:false, message: 'Invalid password'});
				} else {
					var token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h'});
					res.json({success:true, message: 'User authenticated', token: token});
				}
			}
		})
	});


	router.use(function (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
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


	router.post('/me', function (req, res) {
		
	})



	return router;
}