CoursesController.$inject = [
	'CoursesService', 
	'Modal',
	'DateService'
];

function CoursesController(
	CoursesService, 
	Modal,
	DateService) 
{

	var vm = this;

	vm.model = {
		activeFilter : 'popular',
		courses : [],
		courseEntries : [],
	};

	vm.util = {
		filters : {
			popular : 'Популярні',
			created : 'Створені нещодавно',
			updated : 'Оновлені нещодавно'
		},
		dateOptions : DateService.getOptions()
	};

	vm.startCourse = function () {
		Modal.get('NewCourseModal.html', 'OpenCourseController');
	};

	vm.init = function() {
		CoursesService.getCourses()
		.then(
			function (data) {
				vm.model.courses = data.data;
			}
		);
	};

	vm.init();
}