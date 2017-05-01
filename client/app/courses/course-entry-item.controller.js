CourseEntryItemController.$inject = [
  'CoursesService', 
  'LecturesService',
  'TasksService',
  'StudentsService',
  'Modal',
  'CoursesFactory',
  'LecturesFactory',
  'TasksFactory',
  'User',
  '$stateParams',
  '$state',
  '$q'
];

function CourseEntryItemController(
  CoursesService,
  LecturesService,
  TasksService, 
  StudentsService,
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
  }

  vm.init = function() {
    vm.util.tasksFct.lastViewedCourseEntry = $stateParams.id;
    console.log('init')
    $q.all([
      CoursesService.getCourseEntry($stateParams.id),
      CoursesService.getTaskEntries($stateParams.id),
      CoursesService.getStudents($stateParams.id)
    ])
    .then(
      function (data) {
        console.log(data);
        vm.model.courseEntryItem            = data[0].data.item;
        vm.model.courseEntryItemTaskEntries = data[1].data.items;
        vm.model.courseEntryItemStudents    = data[2].data.items; 
        return CoursesService.getTasks(vm.model.courseEntryItem._course._id);
      }
    ).then(
      function (data) {
        vm.model.courseItemTasks = data.data.items;
      }
    ); 
  };
  vm.init();

  vm.viewTaskEntry = function (item) {
    $state.go('content.task_e_item', {id : item._id});
  }

  vm.createTaskEntry = function () {
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/tasks/create-task-entry-modal.html',
      'NewTaskEntryController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      CoursesService.getTaskEntries($stateParams.id)
      .then(
        function (data) {
          console.log(data.data)
          vm.model.courseEntryItemTaskEntries = data.data.items;
        }
      )
    }
  }

  vm.createStudent = function () {
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/students/create-student-modal.html',
      'NewStudentController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      CoursesService.getStudents($stateParams.id)
      .then(
        function (data) {
          console.log(data.data)
          vm.model.courseEntryItemStudents = data.data.items;
        }
      )
    }
  }

  vm.deleteTaskEntry = function(id) {
    TasksService.deleteEntry(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseEntryItemTaskEntries, function(item) {
          return item._id == id;
        });
        _.remove(vm.util.tasksFct.taskEntries, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteStudent = function(id) {
    StudentsService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseEntryItemStudents, function(item) {
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