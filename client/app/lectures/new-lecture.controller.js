NewLectureController.$inject = [
  'LecturesService',
  'LecturesFactory',
  'CoursesFactory',
  'CoursesService',
  '$uibModalInstance',
  'textAngularManager'
];
function NewLectureController(
  LecturesService,
  LecturesFactory,
  CoursesFactory,
  CoursesService,
  $uibModalInstance,
  textAngularManager) 
{
  var vm = this;

  vm.model = {};

  vm.util = {
    lecturesFct : LecturesFactory.getModel(),
    coursesFct : CoursesFactory.getModel(),
    alerts : []
  }

  vm.init = function () {
    CoursesService.getCourses()
    .then(
      function (data) {
        vm.util.coursesFct.courses = data.data;
      }
    )
    if (vm.util.coursesFct.lectureCoursePreset) {
      vm.model._course = vm.util.coursesFct.courseItem._id;
      vm.util.course = vm.util.coursesFct.courseItem.name;
    }
  }
  vm.init();

  vm.createNewLecture = function () {
    vm.util.alerts = [];
    LecturesService.save(vm.model)
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