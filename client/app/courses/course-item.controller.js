CourseItemController.$inject = [
  'CoursesService', 
  'LecturesService',
  'TasksService',
  'Modal',
  'CoursesFactory',
  'LecturesFactory',
  'TasksFactory',
  'User',
  '$stateParams',
  '$state',
  '$q'
];

function CourseItemController(
  CoursesService,
  LecturesService,
  TasksService, 
  Modal,
  CoursesFactory,
  LecturesFactory,
  TasksFactory,
  User,
  $stateParams,
  $state,
  $q) 
{

  var vm = this;

  vm.model = CoursesFactory.getModel();

  vm.util = {
    tasksFct : TasksFactory.getModel(),
    lecturesFct : LecturesFactory.getModel()
  }

  vm.init = function() {
    vm.util.tasksFct.lastViewedCourse = $stateParams.id;
    vm.util.lecturesFct.lastViewedCourse = $stateParams.id;
    console.log('init')
    $q.all([
      CoursesService.getCourse($stateParams.id),
      CoursesService.getTasks($stateParams.id),
      CoursesService.getLectures($stateParams.id),
      CoursesService.getEntries($stateParams.id)
    ])
    .then(
      function (data) {
        console.log(data);
        vm.model.courseItem           = data[0].data;
        vm.model.courseItemTasks      = data[1].data.items;
        vm.model.courseItemLectures   = data[2].data.items;
        vm.model.courseEntriesForItem = data[3].data.items;  
      }
    ); 
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

  vm.viewLecture = function (item) {
    $state.go('content.lecture_item', {id : item._id});
  }

  vm.viewTask = function (item) {
    $state.go('content.task_item', {id : item._id});
  }

  vm.viewCourseEntry = function(item) {
    $state.go('content.course_e_item', {id : item._id})
  }

  vm.createLecture = function () {
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/lectures/create-lecture-modal.html',
      'NewLectureController', 
      {},
      'lg'
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      CoursesService.getLectures($stateParams.id)
      .then(
        function (data) {
          vm.model.courseItemLectures = data.data.items;
          vm.model.lectureCoursePreset = false; 
        }
      )
    }
  }

  vm.createTask = function () {
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/tasks/create-task-modal.html',
      'NewTaskController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      CoursesService.getTasks($stateParams.id)
      .then(
        function (data) {
          vm.model.courseItemTasks = data.data.items; 
          vm.model.lectureCoursePreset = false;
        }
      )
    }
  }

  vm.createNewCourseEntry = function () { 
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/courses/open-course-modal.html',
      'NewCourseEntryController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      CoursesService.getEntries($stateParams.id)
      .then(
        function (data) {
          vm.model.courseEntriesForItem = data.data.items; 
          vm.model.lectureCoursePreset = false;
        }
      )
    }
  };

  vm.deleteLecture = function(id) {
    LecturesService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseItemLectures, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteTask = function(id) {
    TasksService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseItemTasks, function(item) {
          return item._id == id;
        });
        console.log(data);
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
        _.remove(vm.model.courseEntriesForItem, function(item) {
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