TasksService.$inject = [
  '$q', 
  '$http', 
  'Remote'
];
function TasksService($q, $http, Remote) {
	
  this.get = function (id) {
    return Remote.do('task/' + id, 'GET', {});
  }
  
  this.save = function (task) {
    return Remote.do('task', 'POST', task);
  }

  this.delete = function (id) {
    return Remote.do('task/' + id, 'DELETE', {});
  }

  this.getTests = function (id) {
    return Remote.do('task/' + id + '/tests', 'GET', {});
  }

  this.saveTest = function (test) {
    return Remote.do('test', 'POST', test);
  }

  this.deleteTest = function (id) {
    return Remote.do('test/' + id, 'DELETE', {});
  }
  
  this.getWorks = function (id) {
    return Remote.do('task/' + id + '/works', 'GET', {});
  }

  this.saveWork = function (work) {
    return Remote.do('work', 'POST', work);
  }

  this.deleteWork = function (id) {
    return Remote.do('work/' + id, 'DELETE', {});
  }

  this.saveTaskEntry = function (task_e) {
    return Remote.do('task_e/', 'POST', task_e);
  }

  this.deleteEntry = function (id) {
    return Remote.do('task_e/' + id, 'DELETE', {});
  }

}