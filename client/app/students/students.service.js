StudentsService.$inject = ['$q', '$http', 'Remote'];
function StudentsService($q, $http, Remote) {

	this.getUsers = function () {
    return Remote.do('user/students', 'GET', {});
  }
    this.getStudentsByName = function (name) {
    return Remote.do('user/students?name=' + name, 'GET', {});
  }

  this.saveStudent = function (student) {
    return Remote.do('student/', 'POST', student);
  }

  this.delete = function (id) {
    return Remote.do('student/' + id, 'DELETE', {});
  }

  this.getTaskEntries = function (id) {
    return Remote.do('student/' + id + '/tasks', 'GET', {});
  }

  this.getTaskResults = function (id) {
    return Remote.do('student/' + id + '/results', 'GET', {});
  }

  this.getStudentItems = function (id) {
    return Remote.do('user/' + id + '/student_items', 'GET', {});
  }
  
}