CourseItemController.$inject = [
  'CoursesService', 
  'Modal',
  'CoursesFactory',
  'User',
  '$stateParams',
  '$state'
];

function CourseItemController(
  CoursesService, 
  Modal,
  CoursesFactory,
  User,
  $stateParams,
  $state) 
{

  var vm = this;

  vm.model = CoursesFactory.getModel();

  vm.init = function() {
    console.log('init')
    CoursesService.getCourse($stateParams.id)
    .then(
      function (data) {
        console.log(data)
        vm.model.courseItem = data.data;
      }
    );
  };
  vm.init();

}