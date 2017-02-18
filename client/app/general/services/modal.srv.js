Modal.$inject = ['$uibModal'];

function Modal($uibModal) {
	
	this.get = function(template, controller, resolve) {
		return $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: template,
      controller: controller,
      controllerAs: 'mod',
      resolve: resolve
    });
	}

}