TaskEntryItemController.$inject = [
  'TasksFactory',
  'TasksService',
  'Modal',
  '$stateParams',
  '$state',
  '$q'
];
function TaskEntryItemController (
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
    TasksService.getEntry($stateParams.id)
    .then(
      function (data) {
        console.log(data.data);
        vm.model.taskEntryItem = data.data;
        return $q.all([
          TasksService.getTests(vm.model.taskEntryItem._task._id),
          TasksService.getWorks(vm.model.taskEntryItem._task._id),
          TasksService.getEntryTaskResults(vm.model.taskEntryItem._id)
        ])
      }
    ).then (
      function (data) {
        console.log(data)
        vm.model.taskTests = data[0].data.items;
        vm.model.taskWorks = data[1].data.items;
        vm.model.taskEntryTaskResults = data[2].data.items;
      }
    );
  }
  vm.init();

  vm.createTaskResult = function () {
    TasksService.createTaskResult({
      _taskEntry : vm.model.taskEntryItem._id,
      _student : vm.model.taskEntryItem._student._id
    }).then(
      function (data) {
        console.log(data);
        $state.go('content.task_result', {id : data.data.task_result._id});
      }
    )
  }

  vm.deleteTaskResult = function (id) {
    TasksService.deleteTaskResult(id)
    .then(
      function( data ) {
        _.remove(vm.model.taskEntryTaskResults, function(item) {
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