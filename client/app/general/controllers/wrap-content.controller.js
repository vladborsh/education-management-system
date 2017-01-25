WrapContentController.$inject = ['$timeout'];

function WrapContentController($timeout) {
	var vm = this;

	vm.model = {
		menuHidden : false,
		titlesHidden : false
	}

	vm.toggleMenu = function() {
		vm.model.menuHidden = !vm.model.menuHidden;
		if (vm.model.menuHidden) {
			vm.model.titlesHidden = true;
		} else {
			$timeout(function() {
				vm.model.titlesHidden = false;
			}, 300);
		}
	} 
}