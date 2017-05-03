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

  vm.util = {

  }

  vm.init = function () {
    vm.model.testResults = [];
    vm.model.workResults = [];
    TasksService.getTaskResult($stateParams.id)
    .then(
      function (data) {
        console.log(data.data);
        vm.model.taskResultItem = data.data;
        if (vm.model.taskResultItem.completed) {
          vm.model.viewTaskResult = true;
        } else {
          vm.model.viewTaskResult = false;
        }
        return $q.all([
          TasksService.getTests(vm.model.taskResultItem._taskEntry._task._id),
          TasksService.getWorks(vm.model.taskResultItem._taskEntry._task._id)
        ])
      }
    ).then (
      function (data) {
        vm.model.taskTests = data[0].data.items;
        _.each(vm.model.taskTests, function (test) {
          vm.model.testResults.push({ _taskResult: vm.model.taskResultItem._id, answers: [] });
        })
        vm.model.taskWorks = data[1].data.items;
        _.each(vm.model.taskWorks, function (work) {
          vm.model.workResults.push({ _taskResult: vm.model.taskResultItem._id, body : '' });
        })
        /* If task is completed, hide form items and show only selected answers and work result body */
        if (vm.model.viewTaskResult) {
          $q.all([
            TasksService.getTaskResultTestResults($stateParams.id),
            TasksService.getTaskResultWorkResults($stateParams.id)
          ])
          .then(
            function (data) {
              vm.model.taskTestResults = data[0].data.items;
              vm.model.taskWorkResults = data[1].data.items;
            }
          );
        }
      }
    );
    
  }
  vm.init();

  vm.makeAnswer = function () {
    console.log(vm.model.testResults)
    console.log(vm.model.workResults)
    /* Save test results, save work results, update tsk result to copleted */
    TasksService.saveTestResults(vm.model.testResults)
    .then(
      function (data) {
        console.log(data.data);
        return TasksService.saveWorkResults(vm.model.workResults);
      }
    ).then(
      function (data) {
        console.log(data.data);
        return TasksService.updateTaskResult({
          _id : $stateParams.id,
          _student : vm.model.taskResultItem._student._id,
          completed: true
        })
      }
    ).then(
      function (data) {
        console.log(data.data)
        $state.go('content.task_e_item', {id : vm.model.taskResultItem._taskEntry._id})/**/
      }
    )
  }

  vm.autoCheck = function() {
    var mark = 0;
    if (vm.model.taskTestResults && vm.model.taskTestResults.length > 0) {
      _.each(vm.model.taskTests, function (test, keyTest) {
        _.each(test.questions, function (question, keyQuestion) {
          if (vm.model.taskTestResults[keyTest] 
            && vm.model.taskTestResults[keyTest].answers
            && vm.model.taskTestResults[keyTest].answers[keyQuestion]
            && question.correctAnswer == vm.model.taskTestResults[keyTest].answers[keyQuestion])
          {
            mark += 1;
          }
        });
      });
    }
    vm.util.editTaskResultMark = true;
    vm.model.taskResultItem.mark = mark;
  }

  vm.editMark = function () {
    if (vm.util.editTaskResultMark) {
      TasksService.updateTaskResult({
        _id : $stateParams.id,
        _student : vm.model.taskResultItem._student._id,
        mark : vm.model.taskResultItem.mark
      }).then(
        function (data) {
          console.log(data.data)
        }
      );
    }
    vm.util.editTaskResultMark = !vm.util.editTaskResultMark;
  }

}