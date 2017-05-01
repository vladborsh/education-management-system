UsersService.$inject = ['Remote'];
function UsersService(Remote) {
  
  this.getInfo = function (id) {
    return Remote.do('user/' + id, 'GET', {});
  }

  this.remove = function (id) {
    return Remote.do('user/' + id, 'DELETE', {});
  }

}