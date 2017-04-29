TaskItemController.$inject = [
  'TasksFactory',
  'TasksService',
  'Modal',
  '$stateParams',
  '$state',
  '$q'
];
function TaskItemController (
  TasksFactory,
  TasksService,
  Modal,
  $stateParams,
  $state,
  $q) 
{
  var vm = this;

  vm.model = TasksFactory.getModel();

  vm.init = function () {
    $q.all([
      TasksService.get($stateParams.id),
      TasksService.getTests($stateParams.id),
      TasksService.getWorks($stateParams.id)
    ]).then(
      function (data) {
        vm.model.taskItem = data[0].data;
        vm.model.taskTests = data[1].data.items;
        vm.model.taskWorks = data[2].data.items;
      }
    );
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

  vm.createWork = function() {
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

  vm.deleteWork = function (id) {
    TasksService.deleteWork(id)
    .then(
      function( data ) {
        _.remove(vm.model.taskWorks, function(item) {
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