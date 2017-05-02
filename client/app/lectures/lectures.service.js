LecturesService.$inject = [
  '$q', 
  '$http', 
  'Remote'
];
function LecturesService($q, $http, Remote) {

  this.getLectures = function () {
    return Remote.do('lecture', 'GET', {});
  }

  this.getLecturesByName = function (name) {
    return Remote.do('lecture?name=' + name, 'GET', {});
  }
	
  this.get = function (id) {
    return Remote.do('lecture/' + id, 'GET', {});
  }

  this.save = function (lecture) {
    return Remote.do('lecture', 'POST', lecture);
  }

  this.delete = function (id) {
    return Remote.do('lecture/' + id, 'DELETE', {});
  }

}