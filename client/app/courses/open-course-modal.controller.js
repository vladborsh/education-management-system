CourseEntryController.$inject = [
	'$uibModalInstance',
	'CoursesService',
	'CoursesFactory',
	'Modal',
	'courses',
	'courseEntryRecord'
];

function CourseEntryController(
	$uibModalInstance,
	CoursesService,
	CoursesFactory,
	Modal,
	courses,
	courseEntryRecord) 
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
		isUpdatedCourseEntry : false
	}

	mod.setupCourse = function(item) {
		mod.model = item;
		mod.model._course = mod.model._course._id;
		mod.model.startDate = new Date(mod.model.startDate);
		mod.model.endDate = new Date(mod.model.endDate);
		mod.util.isUpdatedCourseEntry = true;
		mod.util.course = mod.model._course.name;
	}

	mod.init = function () {
		console.log(courseEntryRecord);
		if (courseEntryRecord) {
			mod.setupCourse(courseEntryRecord);
		}
		CoursesService.getTeachers()
		.then(
			function (data) {
				if (data.data.success) {
					mod.util.teachers = data.data.users
					if (mod.util.isUpdatedCourseEntry) {
						var lector = _.find(mod.util.teachers, function(l) { return l._id == mod.model._lector._id; });
						mod.util.lector = lector.firstName + ' ' + lector.lastName;
						mod.model._lector = mod.model._lector._id;
					}
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
  			if (data.data.success) {
  				CoursesService.getCourseEntry(data.data.id)
					.then(
  					function(data) {
  						console.log(data);
  						CoursesFactory.getCourseEntries().push(data.data.item);
  						mod.setupCourse(data.data.item);
  					}
  				);
  			}
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


	mod.updateCourseEntry = function () {
		mod.util.alerts = []
		CoursesService.updateCourseEntry(mod.model._id, mod.model)
		.then(
  		function(data) {
  			if (data.data.success) {
  				CoursesService.getCourseEntry(data.data.id)
					.then(
  					function(data) {
  						console.log(data);
  						var index = _.findIndex(CoursesFactory.getCourseEntries(), function(c) { return c._id == data.data.item._id; });
  						mod.setupCourse(data.data.item);
  						CoursesFactory.getCourseEntries()[index] = data.data.item;
  					}
  				);
  			}
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

  mod.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

}