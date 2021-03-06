SignInController.$inject = [
	'SignInService',
	'AuthFactory', 
	'User',
	'$state'
]

function SignInController(
	SignInService, 
	AuthFactory, 
	User,
	$state) 
{

	var vm = this;

	vm.model = {
		email : '',
		password : '',
	}

	vm.util = {
		alerts : [],
	}

	vm.closeAlert = function(index) {
    vm.util.alerts.splice(index, 1);
  };

	vm.signIn = function () {
		vm.util.alerts = [];
		SignInService.signIn(vm.model)
		.then(
			function (data) {
				console.log(data);
				AuthFactory.setToken(data.token);
				User.set('username', data.username);
				User.set('user_id', data.id);
				User.set('role', data.role);
				$state.go('content.home');
			}, function (err) {
				vm.util.alerts.push({type: 'danger', msg: err.message});
			}
		);
	}
}