TasksService.$inject = [
  '$q', 
  '$http', 
  'Remote'
];
function TasksService($q, $http, Remote) {

  this.getTasks = function (id) {
    return Remote.do('task', 'GET', {});
  }

  this.getTaskEntries = function (id) {
    return Remote.do('task_e', 'GET', {});
  }
	
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

  this.getEntry = function (id) {
    return Remote.do('task_e/' + id, 'GET', {});
  }

  this.saveTaskEntry = function (task_e) {
    return Remote.do('task_e/', 'POST', task_e);
  }

  this.deleteEntry = function (id) {
    return Remote.do('task_e/' + id, 'DELETE', {});
  }

  this.getEntryTaskResults = function (id) {
    return Remote.do('task_e/' + id + '/results', 'GET', {});
  }

  this.getTaskResult = function (id) {
    return Remote.do('task_result/' + id, 'GET', {});
  }

  this.createTaskResult = function (task_result) {
    return Remote.do('task_result/', 'POST', task_result);
  }

  this.deleteTaskResult = function (id) {
    return Remote.do('task_result/' + id, 'DELETE', {});
  }

  this.saveTestResults = function (items) {
    return Remote.do('test_result/', 'POST', items);
  }

  this.saveWorkResults = function (items) {
    return Remote.do('work_result/', 'POST', items);
  }

}