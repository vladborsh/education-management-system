SignUpService.$inject = ['$http', '$q']
function SignUpService($http, $q) {
	
	this.signUp = function (user) {
		var deferred = $q.defer();
		$http.post('/api/users', user)
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