NewCourseController.$inject = [
  '$uibModalInstance',
  'CoursesService',
  'CoursesFactory',
  'Modal'
];

function NewCourseController(
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
    author : '',
    authors : [],
    alerts : [],
  }

  vm.init = function () {
    CoursesService.getAdmins()
    .then(
      function (data) {
        if (data.data.success) {
          vm.util.authors = data.data.users
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

  vm.setAuthor = function (author) {
    vm.util.author = author.firstName + ' ' + author.lastName;
    vm.model._author = author._id; 
  }

  vm.createNewCourse = function() {
    vm.util.alerts = []
    CoursesService.saveCourse(vm.model)
    .then(
      function(data) {
        vm.util.alerts.push({
          type: (data.data.success ? 'success' : 'danger'), msg: data.data.message
        });
        if (data.data.success) {
          CoursesService.getCourse(data.data.id)
          .then(
            function(data) {
              console.log(data);
              vm.util.coursesFct.courses.push(data.data);
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
    $uibModalInstance.dismiss();
  };

}