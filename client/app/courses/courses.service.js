CoursesService.$inject = ['Remote'];

function CoursesService(Remote) {

	this.getCourses = function () {
		return Remote.do('course', 'GET', {});
	}

	this.getCourse = function (id) {
		return Remote.do('course/' + id, 'GET', {});
	}

	this.getCourseEntries = function () {
		return Remote.do('course_e', 'GET', {});
	}

	this.getCourseEntry = function (id) {
		return Remote.do('course_e/' + id, 'GET', {});
	}

	this.saveCourse = function (course) {
		return Remote.do('course', 'POST', course);
	}

	this.updateCourse = function (id, course) {
		return Remote.do('course/' + id, 'POST', course);
	}

	this.saveCourseEntry = function (courseEntry) {
		return Remote.do('course_e', 'POST', courseEntry);
	}

	this.updateCourseEntry = function (id, courseEntry) {
		return Remote.do('course_e/' + id, 'POST', courseEntry);
	}

	this.getAdmins = function () {
		return Remote.do('user/admins', 'GET', {});
	}

	this.getTeachers = function () {
		return Remote.do('user/teachers', 'GET', {});
	}

}