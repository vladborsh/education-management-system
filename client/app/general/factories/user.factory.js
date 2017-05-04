User.$inject = ['AuthFactory', 'Remote', '$log', '$q', '$state'];

function User(AuthFactory, Remote, $log, $q, $state) {

	var model = {}

	setup ()

	function setup () {
		var deferred = $q.defer();
		if (AuthFactory.isLoggedIn()) {
			Remote.do('user/info', 'GET', {})
			.then(
				function (data) {
					console.log('USER', data.data)
					model['username'] = data.data.username;
					model['user_id'] = data.data.id;
					model['role'] = data.data.role;
					deferred.resolve();
				}, function (err) {
					$log.error(err);
					$state.go('login.signin')
					deferred.reject(err);
				}
			);
		} else {
			$state.go('login.signin')
		}
		return deferred.promise;
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
		},
		setup : setup
	}

}