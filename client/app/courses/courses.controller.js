CoursesController.$inject = [
	'CoursesService', 
	'Modal',
	'DateService',
	'CoursesFactory',
	'User',
	'$stateParams',
	'$state'
];

function CoursesController(
	CoursesService, 
	Modal,
	DateService,
	CoursesFactory,
	User,
	$stateParams,
	$state) 
{

	console.log($stateParams.id);

	var vm = this;

	vm.model = {
		activeFilter : 'popular',
		courses : CoursesFactory.getCourses,
		courseEntries : CoursesFactory.getCourseEntries,
		myCourses : [],
	};

	vm.util = {
		filters : {
			popular : 'Популярні',
			created : 'Створені нещодавно',
			updated : 'Оновлені нещодавно'
		},
		dateOptions : DateService.getOptions(),
		isSingleCourse: false
	};

	vm.init = function() {
		if ($stateParams.id) {

		} else {
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
					vm.model.myCourses = _.filter(vm.model.courseEntries(), function (c) {return c._lector._id == User.get('user_id')});
				}
			);
		}
		
	};
	vm.init();

	vm.createNewCourseEntry = function () {
		var modal = Modal.get(
			'app/courses/open-course-modal.html',
			'CourseEntryController', 
			{
				courses : function () { return vm.model.courses },
				courseEntryRecord : function () { return undefined; },
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

  vm.viewCourse = function(item) {
		//$state.go('content.courses', {type: 'c', id: _id});
  }

  vm.viewCourseEntry = function(item) {
		//$state.go('content.courses', {type: 'ce', id: _id});
		var modal = Modal.get(
			'app/courses/open-course-modal.html',
			'CourseEntryController', 
			{
				courses : function () { return vm.model.courses },
				courseEntryRecord : function () { return item; },
			}
		);
  }
  
}