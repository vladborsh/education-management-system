var User = require('../models/user');

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
	})

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
					res.json({success:true, message: 'User authenticated'});
				}
			}
		})
	})


	return router;
}