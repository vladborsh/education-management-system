AuthInterceptorFactory.$inject = ['AuthFactory'];
function AuthInterceptorFactory (AuthFactory) {
	return {
		request : function (config) {
			var token = AuthFactory.getToken();
			if (token) {
				config.headers['x-access-token'] = token
			}
			return config;
		}
	}
}