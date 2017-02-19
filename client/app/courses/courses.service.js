CoursesService.$inject = ['Remote'];

function CoursesService(Remote) {

	this.getCourses = function () {
		return Remote.do('course', 'GET', {});
	}

	this.getCourseEntries = function () {
		return Remote.do('course_e', 'GET', {});
	}

	this.saveCourse = function (course) {
		return Remote.do('course', 'POST', course);
	}

	this.saveCourseEntry = function (courseEntry) {
		return Remote.do('course_e', 'POST', courseEntry);
	}

	this.getAdmins = function () {
		return Remote.do('user/admins', 'GET', {});
	}

	this.getTeachers = function () {
		return Remote.do('user/teachers', 'GET', {});
	}

}