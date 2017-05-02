CoursesService.$inject = ['Remote'];

function CoursesService(Remote) {

	this.getCourses = function () {
		return Remote.do('course', 'GET', {});
	}

	this.getCoursesByName = function (name) {
		return Remote.do('course?name=' + name, 'GET', {});
	}

	this.getCourse = function (id) {
		return Remote.do('course/' + id, 'GET', {});
	}

	this.saveCourse = function (course) {
		return Remote.do('course', 'POST', course);
	}

	this.updateCourse = function (id, course) {
		return Remote.do('course/' + id, 'POST', course);
	}

	this.deleteCourse = function (id) {
		return Remote.do('course/' + id, 'DELETE', {});
	}

	this.getCourseEntries = function () {
		return Remote.do('course_e', 'GET', {});
	}

	this.getCourseEntriesByName = function (name) {
		return Remote.do('course_e?name=' + name, 'GET', {});
	}

	this.getCourseEntriesByLector = function (lector_id) {
		return Remote.do('course_e?lector=' + lector_id, 'GET', {});
	}

	this.getCourseEntry = function (id) {
		return Remote.do('course_e/' + id, 'GET', {});
	}

	this.saveCourseEntry = function (courseEntry) {
		return Remote.do('course_e', 'POST', courseEntry);
	}

	this.updateCourseEntry = function (id, courseEntry) {
		return Remote.do('course_e/' + id, 'POST', courseEntry);
	}

	this.deleteCourseEntry = function (id) {
		return Remote.do('course_e/' + id, 'DELETE', {});
	}

	this.getAdmins = function () {
		return Remote.do('user/admins', 'GET', {});
	}

	this.getTeachers = function () {
		return Remote.do('user/teachers', 'GET', {});
	}

	this.getTasks = function (id) {
		return Remote.do('course/' + id + '/tasks', 'GET', {});	
	}

	this.getLectures = function (id) {
		return Remote.do('course/' + id + '/lectures', 'GET', {});	
	}

	this.getEntries = function (id) {
		return Remote.do('course/' + id + '/entries', 'GET', {});	
	}

	this.getTaskEntries = function (id) {
		return Remote.do('course_e/' + id + '/tasks', 'GET', {});	
	}

	this.getStudents = function (id) {
		return Remote.do('course_e/' + id + '/students', 'GET', {});	
	}
	
}