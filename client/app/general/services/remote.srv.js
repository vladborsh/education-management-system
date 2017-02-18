Remote.$inject = ['$q', '$http'];

function Remote($q, $http) {

	this.do = function (apiName, methodName, requestData) {
		var deferred = $q.defer();
		$http({
		  method: methodName,
		  url: 'api/' + apiName,
		  data: requestData
		})
		.then(
			function (data) {
			  deferred.resolve(data)
			}, function (err) {
			  deferred.reject(err);
			}
		);
		return deferred.promise;
	}

}
