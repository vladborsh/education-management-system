OpenCourseController.$inject = [
	'$uibModalInstance',
	'CoursesService'
];

function OpenCourseController(
	$uibModalInstance,
	CoursesService) 
{

	var mod = this;

	mod.model = {

	}

	mod.util = {
		alerts : []
	}

	mod.closeAlert = function(index) {
    mod.util.alerts.splice(index, 1);
  };

	mod.saveCourse = function () {
		mod.util.alerts = []
		CoursesService.saveCourse(model)
		.then(
			function (data) {
				
			}, function (err) {
				mod.util.alerts.push(err.data);
			}
		);
	}
}