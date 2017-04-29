NewWorkController.$inject = [
  'TasksService',
  '$uibModalInstance',
  '$stateParams',
  'textAngularManager'
];
function NewWorkController(
  TasksService,
  $uibModalInstance,
  $stateParams,
  textAngularManager) 
{
  var vm = this;

  vm.model = {
    _task : $stateParams.id
  };

  vm.util = {
    alerts : []
  }

  vm.saveWork = function () {
    vm.util.alerts = [];
    TasksService.saveWork(vm.model)
    .then(
      function(data) {
        console.log(data.data)
        $uibModalInstance.dismiss();
      }
    );
  }

  vm.closeAlert = function(index) {
    vm.util.alerts.splice(index, 1);
  };

  vm.close = function () {
    $uibModalInstance.dismiss();
  };
  
}