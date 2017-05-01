NewStudentController.$inject = [
  'StudentsFactory',
  'StudentsService',
  'CoursesService',
  '$uibModalInstance',
  '$stateParams'
];
function NewStudentController (
  StudentsFactory,
  StudentsService,
  CoursesService,
  $uibModalInstance,
  $stateParams) 
{
  var vm = this;

  vm.model = {};

  vm.util = {
    users : [],
    courseEntries : [],
    alerts : [],
    studentsFct : StudentsFactory.getModel()
  }

  vm.init = function () {
    console.log('students fct: ', vm.util.studentsFct)
    if (vm.util.studentsFct.coursePreset) {
      vm.model._courseEntry = $stateParams.id;
      StudentsService.getUsers()
      .then(
        function (data) {
          vm.util.users = data.data.users;
        }
      );
    } else if (vm.util.studentsFct.userPreset) {
      vm.model._user = $stateParams.id;
      CoursesService.getCourseEntries()
      .then(
        function (data) {
          vm.util.courseEntries = data.data;
        }
      );
    }
    
    
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

  vm.setCourse = function (course) {
    vm.model._courseEntry = course._id;
    vm.util.course = course.name;
  }

}