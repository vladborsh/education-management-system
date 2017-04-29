LectureItemController.$inject = [
  'LecturesService',
  'Modal',
  'LecturesFactory',
  '$stateParams',
  '$state'
];

function LectureItemController(
  LecturesService,
  Modal,
  LecturesFactory,
  $stateParams,
  $state) 
{

  var vm = this;

  vm.model = LecturesFactory.getModel();

  vm.init = function () {
    LecturesService.get($stateParams.id)
    .then(
      function (data) {
        console.log(data.data)
        vm.model.lectureItem = data.data
      }
    );
  }
  vm.init();

  vm.backToCourse = function () {
    $state.go('content.course_item', {id : vm.model.lastViewedCourse});
    
  }

}