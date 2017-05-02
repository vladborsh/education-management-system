StudentsController.$inject = [
  'StudentsFactory',
  'StudentsService',
  'UsersService',
  'Modal',
  '$state'
];
function StudentsController(
  StudentsFactory,
  StudentsService,
  UsersService,
  Modal,
  $state) 
{
  
  var vm = this;

  vm.model = StudentsFactory.getModel();

  vm.util = {}

  vm.init = function() {
    StudentsService.getUsers()
    .then(
      function (data) {
        console.log(data)
        vm.model.studentUsers = data.data.users;
      }
    )
  };
  vm.init();

  vm.viewStudent = function (item) {
    $state.go('content.student_item', {id : item._id});
  }

  vm.createStudent = function () {
    vm.model.lectureCoursePreset = true;
    var modal = Modal.get(
      'app/students/create-student-modal.html',
      'NewStudentController', 
      {}
    );
  }

  vm.deleteUser = function(id) {
    UsersService.remove(id)
    .then(
      function( data ) {
        _.remove(vm.model.studentUsers, function(item) {
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