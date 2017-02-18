NavigationController.$inject = ['User', '$state'];
function NavigationController (User, $state) {

	var vm = this;

	vm.model = {
		nav : [
			{ label: 'Домашня', 	link: 'content.home', 		icon: 'fa-home'},
			{ label: 'Курси', 		link: 'content.courses', 	icon: 'fa-university'},
			{ label: 'Завдання', 	link: 'content.tasks', 		icon: 'fa-check-square-o'},
			{ label: 'Лекції',		link: 'content.lectures', icon: 'fa-book'},
			{ label: 'Студенти', 	link: 'content.students', icon: 'fa-users'},
			{ label: 'Календар', 	link: 'content.calendar', icon: 'fa-calendar'},
		],
		username : User.get('username')
	};

	vm.init = function () {
		var role = User.get('role');
		if (role == 'Admin') vm.model.role = 'Адміністратор'
		if (role == 'Teacher') vm.model.role = 'Вчитель'
		if (role == 'User') vm.model.role = 'Студент'
	}

	vm.init()

	console.log(vm.model.nav);

}