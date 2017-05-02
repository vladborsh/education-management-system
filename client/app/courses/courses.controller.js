CoursesController.$inject = [
  'CoursesService', 
  'Modal',
  'DateService',
  'CoursesFactory',
  'User',
  '$stateParams',
  '$state'
];

function CoursesController(
  CoursesService, 
  Modal,
  DateService,
  CoursesFactory,
  User,
  $stateParams,
  $state) 
{

  var vm = this;

  vm.model = CoursesFactory.getModel();

  vm.util = {
    dateOptions : DateService.getOptions()
  };

  vm.init = function() {
    CoursesService.getCourses()
    .then(
      function (data) {
        vm.model.courses = data.data;
        return CoursesService.getCourseEntries()
      }
    )
    .then(
      function(data) {
        vm.model.courseEntries = data.data;
        vm.model.myCourses = _.filter(vm.model.courseEntries, function (c) {
          return c._lector._id == User.get('user_id')
        });
      }
    );
  };
  vm.init();

  vm.createNewCourseEntry = function () {
    var modal = Modal.get(
      'app/courses/open-course-modal.html',
      'NewCourseEntryController', 
      {}
    );
  };

  vm.createNewCourse = function() {
    var modal = Modal.get(
      'app/courses/new-course-modal.html',
      'NewCourseController', 
      {}
    );
  }

  vm.deleteCourse = function(id) {
    CoursesService.deleteCourse(id)
    .then(
      function( data ) {
        if(data.data.success) {
          _.remove(vm.model.courses, function(item) {
            return item._id == id;
          });
        }
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteCourseEntry = function(id) {
    CoursesService.deleteCourseEntry(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseEntries, function(item) {
          return item._id == id;
        });
        _.remove(vm.model.myCourses, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }
  
}