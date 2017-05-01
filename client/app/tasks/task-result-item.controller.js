TaskResultItemController.$inject = [
  'TasksFactory',
  'TasksService',
  'Modal',
  'textAngularManager',
  '$stateParams',
  '$state',
  '$q'
];
function TaskResultItemController (
  TasksFactory,
  TasksService,
  Modal,
  textAngularManager,
  $stateParams,
  $state,
  $q) 
{
  var vm = this;

  vm.model = TasksFactory.getModel();

  vm.init = function () {
    vm.model.testResults = [];
    vm.model.workResults = [];
    TasksService.getTaskResult($stateParams.id)
    .then(
      function (data) {
        console.log(data.data);
        vm.model.taskResultItem = data.data;
        return $q.all([
          TasksService.getTests(vm.model.taskResultItem._taskEntry._task._id),
          TasksService.getWorks(vm.model.taskResultItem._taskEntry._task._id)
        ])
      }
    ).then (
      function (data) {
        console.log(data[0].data.items)
        vm.model.taskTests = data[0].data.items;
        _.each(vm.model.taskTests, function (test) {
          vm.model.testResults.push({ _taskResult: vm.model.taskResultItem._id, answers: [] });
        })
        console.log(data[1].data.items)
        vm.model.taskWorks = data[1].data.items;
        _.each(vm.model.taskWorks, function (work) {
          vm.model.workResults.push({ _taskResult: vm.model.taskResultItem._id, body : '' });
        })
      }
    );
  }
  vm.init();

  vm.makeAnswer = function () {
    console.log(vm.model.testResults)
    console.log(vm.model.workResults)
    TasksService.saveTestResults(vm.model.testResults)
    .then(
      function (data) {
        console.log(data.data);
        return TasksService.saveWorkResults(vm.model.workResults);
      }
    ).then(
      function (data) {
        console.log(data.data);
        $state.go('content.tasks')
      }
    );
  }

}