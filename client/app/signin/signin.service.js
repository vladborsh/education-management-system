SignInService.$inject = ['$http', '$q', AuthFactory]
function SignInService($http, $q, AuthFactory) {

	this.signIn = function (user) {
		var deferred = $q.defer();
		$http.post('/api/user/auth', user)
		.then(
			function (data) {
				if(data.data.success) {
					console.log(data);
					deferred.resolve(data.data);
					AuthFactory.setToken(data.data.token);
				} else {
					console.log(data);
					deferred.reject(data.data);
				}
			}, function (err) {
				console.log(err);
				deferred.reject(err);
			}
		);
		return deferred.promise;
	}
	
}
