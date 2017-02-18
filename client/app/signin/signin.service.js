SignInService.$inject = ['$http', '$q', 'AuthFactory']
function SignInService($http, $q, AuthFactory) {

	this.signIn = function (user) {
		var deferred = $q.defer();
		$http.post('/api/user/auth', user)
		.then(
			function (data) {
				if(data.data.success) {
					deferred.resolve(data.data);
				} else {
					deferred.reject(data.data);
				}
			}, function (err) {
				deferred.reject(err);
			}
		);
		return deferred.promise;
	}
	
}
