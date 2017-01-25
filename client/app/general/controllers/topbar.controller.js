TopbarController.$inject = ['AuthFactory', '$state'];
function TopbarController (AuthFactory, $state) {

	var vm = this;

	vm.model = {};

	vm.logout = function () {
		AuthFactory.removeToken();
		$state.go('login.signin');
	}
}