NewTaskController.$inject = [
  'TasksService',
  'TasksFactory',
  'CoursesFactory',
  '$uibModalInstance'
];
function NewTaskController (
  TasksService,
  TasksFactory,
  CoursesFactory,
  $uibModalInstance) 
{
  var vm = this;

  vm.model = {};

  vm.util = {
    coursesFct : CoursesFactory.getModel(),
    alerts : []
  }

  vm.init = function () {
    if (vm.util.coursesFct.lectureCoursePreset) {
      vm.model._course = vm.util.coursesFct.courseItem._id;
      vm.util.course = vm.util.coursesFct.courseItem.name;
    }
  }
  vm.init();


  vm.createNewTask = function () {
    vm.util.alerts = [];
    TasksService.save(vm.model)
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

  vm.setCourse = function (course) {
    vm.model._course = course._id;
    vm.util.course = course.name;
  }

}