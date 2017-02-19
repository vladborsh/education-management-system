OpenCourseController.$inject = [
	'$uibModalInstance',
	'CoursesService',
	'Modal',
	'courses'
];

function OpenCourseController(
	$uibModalInstance,
	CoursesService,
	Modal,
	courses) 
{

	var mod = this;

	mod.model = {

	}

	mod.util = {
		alerts : [],
		showSuggestions : false,
		course : '',
		courses : courses || [],
		lector : '',
		teachers : [],
	}

	mod.init = function () {
		CoursesService.getTeachers()
		.then(
			function (data) {
				if (data.data.success) {
					mod.util.teachers = data.data.users
				}
			}, function (err) {
				console.log(err);
			}
		)
	}
	mod.init();

	mod.closeAlert = function(index) {
    mod.util.alerts.splice(index, 1);
  };

  mod.setCourse = function (course) {
  	mod.model._course = course._id;
  	mod.util.course = course.name;
  }

  mod.setLector = function (lector) {
  	mod.model._lector = lector._id;
  	mod.util.lector = lector.firstName + ' ' + lector.lastName;
  }

  mod.createNewCourse = function() {
  	var modal = Modal.get(
			'app/courses/new-course-modal.html',
			'NewCourseController', 
			{}
		);
  }

	mod.saveCourseEntry = function () {
		mod.util.alerts = []
		CoursesService.saveCourseEntry(mod.model)
		.then(
  		function(data) {
  			mod.util.alerts.push({
  				type: (data.data.success ? 'success' : 'danger'), msg: data.data.message
  			});
  		}, function (err) {
  			mod.util.alerts.push({
  				type: 'danger', msg: data.data
  			});
  		}
  	)
	}

	mod.startCourse = function () {
    $uibModalInstance.close();
  };

  mod.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

}