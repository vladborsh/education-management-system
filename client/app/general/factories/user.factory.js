User.$inject = ['AuthFactory', 'Remote', '$log'];

function User(AuthFactory, Remote, $log) {

	var model = { }

	if (AuthFactory.isLoggedIn()) {
		Remote.do('user/info', 'GET', {})
		.then(
			function (data) {
				model['username'] = data.data.username;
				model['user_id'] = data.data.id;
				model['role'] = data.data.role;
			}, function (err) {
				$log.error(err);
			}
		);
	}
	
	return {
		get : function(key) {
			return model[key];
		},
		getUsername : function() {
			return model['username'];
		},
		getUserId : function() {
			return model['user_id'];
		},
		getRole : function() {
			return model['role'];
		},
		set : function (key,value) {
			model[key] = value;
		}
	}

}