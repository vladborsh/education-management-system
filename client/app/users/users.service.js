UsersService.$inject = ['Remote'];
function UsersService(Remote) {
  
  this.getInfo = function (id) {
    return Remote.do('user/' + id, 'GET', {});
  }

  this.getUsers = function () {
    return Remote.do('user', 'GET', {});
  }

  this.update = function (user) {
    return Remote.do('user/' + user._id, 'POST', user);
  }

  this.remove = function (id) {
    return Remote.do('user/' + id, 'DELETE', {});
  }

}