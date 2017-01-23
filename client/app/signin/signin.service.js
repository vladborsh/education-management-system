SignInService.$inject = ['$http', '$q']
function SignInService($http, $q) {

	this.signIn = function (user) {
		var deferred = $q.defer();
		$http.post('/api/auth', user)
		.then(
			function (data) {
				if(data.data.success) {
					console.log(data);
					deferred.resolve(data.data.message);
				} else {
					console.log(data);
					deferred.reject(data.data.message);
				}
			}, function (err) {
				console.log(err);
				deferred.reject(err);
			}
		);
		return deferred.promise;
	}
	
}
