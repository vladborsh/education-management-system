NewStudentController.$inject = [
  'StudentsService',
  '$uibModalInstance',
  '$stateParams'
];
function NewStudentController (
  StudentsService,
  $uibModalInstance,
  $stateParams) 
{
  var vm = this;

  vm.model = {
    _courseEntry : $stateParams.id
  };

  vm.util = {
    users : [],
    alerts : []
  }

  vm.init = function () {
    StudentsService.getUsers()
    .then(
      function (data) {
        console.log(data.data.users)
        vm.util.users = data.data.users;
      }
    );
  }
  vm.init();


  vm.saveStudent = function () {
    vm.util.alerts = [];
    StudentsService.saveStudent(vm.model)
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

  vm.setUser = function (user) {
    vm.model._user = user._id;
    vm.util.user = user.firstName + ' ' + user.lastName;
  }

}