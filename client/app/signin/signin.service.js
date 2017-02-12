SignInService.$inject = ['$http', '$q']
function SignInService($http, $q) {

	this.signIn = function (user) {
		var deferred = $q.defer();
		$http.post('/api/user/auth', user)
		.then(
			function (data) {
				if(data.data.success) {
					console.log(data);
					deferred.resolve(data.data);
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
