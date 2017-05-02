UsersController.$inject = [
  'UsersFactory',
  'UsersService'
];
function UsersController(
  UsersFactory,
  UsersService) 

{
  
  var vm = this;

  vm.model = UsersFactory.getModel();

  vm.util = {}

  vm.init = function() {
    UsersService.getUsers()
    .then(
      function (data) {
        console.log(data)
        vm.model.users = data.data;
      }
    )
  };
  vm.init();

  vm.setAsAdmin = function (user) {
    var oldRole = user.role;
    user.role = 'Admin';
    UsersService.update(user)
    .then(
      function( data ) {
        console.log(data);
      },
      function( err ) {
        console.log(err);
        user.role = oldRole;
      }
    );
  }

  vm.setAsTeacher = function (user) {
    var oldRole = user.role;
    user.role = 'Teacher';
    UsersService.update(user)
    .then(
      function( data ) {
        console.log(data);
      },
      function( err ) {
        console.log(err);
        user.role = oldRole;
      }
    );
  }

  vm.setAsStudent = function (user) {
    var oldRole = user.role;
    user.role = 'Student';
    UsersService.update(user)
    .then(
      function( data ) {
        console.log(data);
      },
      function( err ) {
        console.log(err);
        user.role = oldRole;
      }
    );
  }

  vm.deleteUser = function(id) {
    UsersService.remove(id)
    .then(
      function( data ) {
        _.remove(vm.model.users, function(item) {
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