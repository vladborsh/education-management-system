NewCourseEntryController.$inject = [
  '$uibModalInstance',
  'CoursesService',
  'CoursesFactory',
  'Modal'
];

function NewCourseEntryController(
  $uibModalInstance,
  CoursesService,
  CoursesFactory,
  Modal) 
{

  var vm = this;

  vm.model = {

  }

  vm.util = {
    coursesFct : CoursesFactory.getModel(),
    alerts : [],
    showSuggestions : false,
    course : '',
    lector : '',
    teachers : [],
    isUpdatedCourseEntry : false
  }

  vm.init = function () {
    CoursesService.getTeachers()
    .then(
      function (data) {
        if (data.data.success) {
          vm.util.teachers = data.data.users
          if (vm.util.isUpdatedCourseEntry) {
            var lector = _.find(vm.util.teachers, function(l) { return l._id == vm.model._lector._id; });
            vm.util.lector = lector.firstName + ' ' + lector.lastName;
            vm.model._lector = vm.model._lector._id;
          }
        }
      }, function (err) {
        console.log(err);
      }
    )
  }
  vm.init();

  vm.closeAlert = function(index) {
    vm.util.alerts.splice(index, 1);
  };

  vm.setCourse = function (course) {
    vm.model._course = course._id;
    vm.util.course = course.name;
  }

  vm.setLector = function (lector) {
    vm.model._lector = lector._id;
    vm.util.lector = lector.firstName + ' ' + lector.lastName;
  }

  vm.createNewCourse = function() {
    var modal = Modal.get(
      'app/courses/new-course-modal.html',
      'NewCourseController', 
      {}
    );
  }

  vm.saveCourseEntry = function () {
    vm.util.alerts = []
    CoursesService.saveCourseEntry(vm.model)
    .then(
      function(data) {
        vm.util.alerts.push({
          type: (data.data.success ? 'success' : 'danger'), msg: data.data.message
        });
        if (data.data.success) {
          CoursesService.getCourseEntry(data.data.id)
          .then(
            function(data) {
              console.log(data);
              vm.util.coursesFct.courseEntries.push(data.data);
            }
          );
          $uibModalInstance.dismiss('cancel');
        }
      }, function (err) {
        vm.util.alerts.push({
          type: 'danger', msg: data.data
        });
      }
    )
  }

  vm.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

}