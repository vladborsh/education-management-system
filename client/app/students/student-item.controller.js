StudentItemController.$inject = [
  'StudentsFactory',
  'StudentsService',
  'TasksService',
  'UsersService',
  'Modal',
  '$stateParams',
  '$q'
];
function StudentItemController(
  StudentsFactory,
  StudentsService,
  TasksService,
  UsersService,
  Modal,
  $stateParams,
  $q) 
{
  var vm = this;

  vm.model = StudentsFactory.getModel();

  vm.init = function () {
    $q.all([
      UsersService.getInfo($stateParams.id),
      StudentsService.getStudentItems($stateParams.id),
      TasksService.getTaskEntries(),
      TasksService.getTaskResults(),
    ])
    .then(
      function(data) {
        console.log(data)
        vm.model.studentItem = data[0].data;
        vm.model.studentCourseEntries = data[1].data;
        vm.model.studentTaskEntries = _.filter(data[2].data, function (e) {
          return e._student._user._id == $stateParams.id
        });
        vm.model.studentTaskResults = _.filter(data[3].data, function (e) {
          if (e._student && e._student._user)
            return e._student._user._id == $stateParams.id
          return false;
        });;
      }
    );
  }
  vm.init();

  vm.createStudent = function () {
    vm.model.userPreset = true;
    var modal = Modal.get(
      'app/students/create-student-modal.html',
      'NewStudentController', 
      {}
    );
    modal.result.then(update);
    modal.closed.then(update);
    function update() {
      StudentsService.getStudentItems($stateParams.id)
      .then(
        function (data) {
          console.log(data.data)
          vm.model.userPreset = false;
          vm.model.studentCourseEntries = data.data;
        }
      )
    }
  }

  vm.remove = function () {
    UsersService.remove($stateParams.id)
    .then(
      function (data) {
        console.log(data);
      }
    );
  }
  

}