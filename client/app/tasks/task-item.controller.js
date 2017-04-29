TaskItemController.$inject = [
  'TasksFactory',
  'TasksService',
  'Modal',
  '$stateParams',
  '$state'
];
function TaskItemController (
  TasksFactory,
  TasksService,
  Modal,
  $stateParams,
  $state) 
{
  var vm = this;

  vm.model = TasksFactory.getModel();

  vm.init = function () {
    TasksService.get($stateParams.id)
    .then(
      function (data) {
        console.log(data)
        vm.model.taskItem = data.data
      }
    );
    TasksService.getTests($stateParams.id)
    .then(
      function (data) {
        console.log(data);
        vm.model.taskTests = data.data.items;
      }
    )
    TasksService.getWorks($stateParams.id)
    .then(
      function (data) {
        console.log(data);
        vm.model.taskWorks = data.data.items;
      }
    )
  }
  vm.init();

  vm.backToCourse = function () {
    $state.go('content.course_item', {id : vm.model.lastViewedCourse});
  }

  vm.createTest = function() {
    var modal = Modal.get(
      'app/tasks/create-test-modal.html',
      'NewTestController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      TasksService.getTests($stateParams.id)
      .then(
        function (data) {
          console.log(data);
          vm.model.taskTests = data.data.items;
        }
      )
    }
  }

  vm.createTest = function() {
    var modal = Modal.get(
      'app/tasks/create-work-modal.html',
      'NewWorkController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      TasksService.getWorks($stateParams.id)
      .then(
        function (data) {
          console.log(data);
          vm.model.taskWorks = data.data.items;
        }
      )
    }
  }

  vm.deleteTest = function (id) {
    TasksService.deleteTest(id)
    .then(
      function( data ) {
        _.remove(vm.model.taskTests, function(item) {
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