CoursesService.$inject = ['Remote'];

function CoursesService(Remote) {

	this.getCourses = function () {
		return Remote.do('course', 'GET', {});
	}

	this.saveCourse = function (course) {
		return Remote.do('course', 'POST', course);
	}

}