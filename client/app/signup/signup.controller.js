SignUpController.$inject = ['SignUpService'];
function SignUpController(SignUpService) {
	var vm = this;
	vm.model = {
		email : '',
		password : '',
		firstName : '',
		lastName : ''
	}

	vm.util = {
		alerts : [],
		confirmPassword : ''
	}

	vm.closeAlert = function(index) {
    vm.util.alerts.splice(index, 1);
  };

	vm.signUp = function () {
		vm.util.alerts = [];
		SignUpService.signUp(vm.model)
		.then(
			function (data) {
				vm.util.alerts.push({type: 'success', msg: data.message});
			}, function (err) {
				vm.util.alerts.push({type: 'danger', msg: err.message});
			}
		);
	}
}