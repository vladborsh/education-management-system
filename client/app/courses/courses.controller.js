CoursesController.$inject = [
	'CoursesService', 
	'Modal',
	'DateService',
	'CoursesFactory',
	'User'
];

function CoursesController(
	CoursesService, 
	Modal,
	DateService,
	CoursesFactory,
	User) 
{

	var vm = this;

	vm.model = {
		activeFilter : 'popular',
		courses : CoursesFactory.getCourses,
		courseEntries : CoursesFactory.getCourseEntries,
		archivedCourses : [],
		myCourses : [],
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
		var modal = Modal.get(
			'app/courses/open-course-modal.html',
			'OpenCourseController', 
			{
				courses : function () { return vm.model.courses }
			}
		);
	};

	vm.createNewCourse = function() {
  	var modal = Modal.get(
			'app/courses/new-course-modal.html',
			'NewCourseController', 
			{}
		);
  }

  vm.activateCourse = function() {
  	var modal = Modal.get(
			'app/courses/activate-course-modal.html',
			'ActivateCourseController', 
			{}
		);
  }

  vm.removeCourse = function() {
  	var modal = Modal.get(
			'app/courses/remove-course-modal.html',
			'RemoveCourseController', 
			{}
		);
  }

  vm.archivateCourse = function() {
  	var modal = Modal.get(
			'app/courses/archivate-course-modal.html',
			'ArchivateCourseController', 
			{}
		);
  }

	vm.init = function() {
		CoursesService.getCourses()
		.then(
			function (data) {
				CoursesFactory.set('courses', data.data);
				return CoursesService.getCourseEntries()
			}
		)
		.then(
			function(data) {
				CoursesFactory.set('courseEntries', data.data);
				vm.model.archivedCourses = _.filter(vm.model.courseEntries(), function (c) {return !c.active});
				vm.model.myCourses = _.filter(vm.model.courseEntries(), function (c) {return c._lector._id == User.get('user_id')});
			}
		);
	};

	vm.init();
}