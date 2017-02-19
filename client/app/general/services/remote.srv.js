Remote.$inject = ['$q', '$http', '$log'];

function Remote($q, $http, $log) {

	this.do = function (apiName, methodName, requestData) {
		$log.debug('\n' + methodName + ' ' + apiName);
		$log.debug(requestData);
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
