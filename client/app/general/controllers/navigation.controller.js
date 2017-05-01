NavigationController.$inject = ['User', '$state'];
function NavigationController (User, $state) {

  var vm = this;

  vm.model = {
    nav : [
      { label: 'Домашня',     link: 'content.home',     icon: 'fa-home'},
      { label: 'Курси',       link: 'content.courses',  icon: 'fa-university'},
      { label: 'Завдання',    link: 'content.tasks',    icon: 'fa-check-square-o'},
      { label: 'Лекції',      link: 'content.lectures', icon: 'fa-book'},
      { label: 'Студенти',    link: 'content.students', icon: 'fa-users'},
      { label: 'Користувачі', link: 'content.users', icon: 'fa-user-circle'},
    ],
    username : User.getUsername,
    role : User.getRole
  };

  vm.init = function () {
  }

  vm.init()

  console.log(vm.model.nav);

}