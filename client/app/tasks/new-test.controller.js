NewTestController.$inject = [
  'TasksFactory',
  'TasksService',
  '$uibModalInstance',
  '$stateParams'
];
function NewTestController(
  TasksFactory,
  TasksService,
  $uibModalInstance,
  $stateParams) 
{
  
  var vm = this;

  vm.model = {
    _task : $stateParams.id,
    questions : [],
    newQuestion : {
      question : '',
      correctAnswer : 0,
      answers : ['', '']
    }
  }

  vm.addAnswer = function () {
    if (vm.model.newQuestion.answers.length < 4) {
      vm.model.newQuestion.answers.push('');
    }
  }

  vm.selectTrueAnswer = function(i) {
    vm.model.newQuestion.correctAnswer = i;
  }

  vm.addQuestions = function () {
    vm.model.questions.push(vm.model.newQuestion);
    vm.model.newQuestion = {
      question : '',
      correctAnswer : 0,
      answers : ['', '']
    }
  }

  vm.removeQuestion = function (index) {
    vm.model.questions.splice(index, 1);
  }

  vm.removeAnswer = function (index) {
    vm.model.newQuestion.answers.splice(index, 1);
    if (vm.model.newQuestion.correctAnswer == index) {
      vm.model.newQuestion.correctAnswer = 0;
    }
  }

  vm.saveTest = function () {
    vm.model.newQuestion = undefined;
    console.log(JSON.stringify(vm.model))
    TasksService.saveTest(vm.model)
    .then(
      function (data) {
        console.log(data.data)
        $uibModalInstance.dismiss();
      }
    )
  }

  vm.close = function () {
    $uibModalInstance.dismiss();
  };

}