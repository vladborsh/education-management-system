NewCourseController.$inject = [
	'$uibModalInstance',
	'CoursesService',
	'Modal'
];

function NewCourseController(
	$uibModalInstance,
	CoursesService,
	Modal) 
{

	var mod = this;

	mod.model = {

	}

	mod.util = {
		author : '',
		authors : [],
		alerts : [],
	}

	mod.init = function () {
		CoursesService.getAdmins()
		.then(
			function (data) {
				if (data.data.success) {
					mod.util.authors = data.data.users
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

  mod.setAuthor = function (author) {
  	mod.util.author = author.firstName + ' ' + author.lastName;
  	mod.model._author = author._id; 
  }

  mod.createNewCourse = function() {
  	mod.util.alerts = []
  	CoursesService.saveCourse(mod.model)
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

  mod.close = function () {
    $uibModalInstance.dismiss();
  };

}