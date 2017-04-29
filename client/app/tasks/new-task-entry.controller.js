NewTaskEntryController.$inject = [
  'TasksService',
  'TasksFactory',
  'CoursesFactory',
  '$uibModalInstance',
  '$stateParams'
];
function NewTaskEntryController (
  TasksService,
  TasksFactory,
  CoursesFactory,
  $uibModalInstance,
  $stateParams) 
{
  var vm = this;

  vm.model = {
    _courseEntry : $stateParams.id
  };

  vm.util = {
    coursesFct : CoursesFactory.getModel(),
    alerts : []
  }

  vm.init = function () {
  }
  vm.init();


  vm.saveTaskEntry = function () {
    vm.util.alerts = [];
    TasksService.saveTaskEntry(vm.model)
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

  vm.setTask = function (task) {
    vm.model._task = task._id;
    vm.util.task = task.name;
  }

  vm.setStudent = function (student) {
    vm.model._student = student._id;
    vm.util.student = student._user.firstName + ' ' + student._user.lastName;
  }

}