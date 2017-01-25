AuthFactory.$inject = ['$cookies'];

function AuthFactory ($cookies) {
	return {
		setToken: function(token) {
			$cookies.put('token', token);
		},
		getToken: function () {
			return $cookies.get('token');
		},
		removeToken: function () {
			$cookies.remove('token');
		},
		isLoggedIn: function () {
			return ($cookies.get('token') ? true : false);
		}
	}
}