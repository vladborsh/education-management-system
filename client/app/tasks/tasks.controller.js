TasksController.$inject = [
  'TasksService',
  'TasksFactory',
  'CoursesFactory',
  'CoursesService',
  'Modal',
  'User',
  '$state'
];
function TasksController(
  TasksService,
  TasksFactory,
  CoursesFactory,
  CoursesService,
  Modal,
  User,
  $state) 
{
  var vm = this;

  vm.model = TasksFactory.getModel();

  vm.util = {
    coursesFct : CoursesFactory.getModel()
  };

	vm.init = function() {
    TasksService.getTasks()
    .then(
      function (data) {
        console.log(data.data)
        vm.model.tasks = data.data;
      }
    )
    TasksService.getTaskEntries()
    .then(
      function (data) {
        console.log(data.data)
        vm.model.taskEntries = data.data;
        vm.model.myTasks = _.filter(vm.model.taskEntries, function (t) {
          return t._courseEntry._lector._id == User.get('user_id')
        });
      }
    )
  };
  vm.init();

  vm.createTask = function () {
    CoursesService.getCourses()
    .then(
      function (data) {
        vm.util.coursesFct.courses = data.data;
      }
    )
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/tasks/create-task-modal.html',
      'NewTaskController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      TasksService.getTasks()
      .then(
        function (data) {
          vm.model.tasks = data.data; 
        }
      )
    }
  }

  vm.viewTask = function (item) {
    $state.go('content.task_item', {id : item._id});
  }
  
  vm.viewTaskEntry = function (item) {
    $state.go('content.task_e_item', {id : item._id});
  }

  vm.deleteTask = function(id) {
    TasksService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.util.coursesFct.courseItemTasks, function(item) {
          return item._id == id;
        });
        _.remove(vm.model.tasks, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteTaskEntry = function(id) {
    TasksService.deleteEntry(id)
    .then(
      function( data ) {
        _.remove(vm.util.coursesFct.courseEntryItemTaskEntries, function(item) {
          return item._id == id;
        });
        _.remove(vm.util.myTasks, function(item) {
          return item._id == id;
        });
        _.remove(vm.model.taskEntries, function(item) {
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