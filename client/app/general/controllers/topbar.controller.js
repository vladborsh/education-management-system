TopbarController.$inject = [
  'AuthFactory', 
  'SearchFactory',
  'CoursesService',
  'TasksService',
  'LecturesService',
  'StudentsService',
  '$state',
  '$q'];
function TopbarController (
  AuthFactory, 
  SearchFactory,
  CoursesService,
  TasksService,
  LecturesService,
  StudentsService,
  $state,
  $q) {

	var vm = this;

	vm.model = {};

  vm.util = {
    searchFct : SearchFactory.getModel(),
  }

	vm.logout = function () {
		AuthFactory.removeToken();
		$state.go('login.signin');
	}

  vm.search = function(event) {
    if (event.keyCode == 13 && vm.model.search) {
      vm.util.searchFct.searchResults = [];
      $q.all([
        CoursesService.getCoursesByName(vm.model.search),
        CoursesService.getCourseEntriesByName(vm.model.search),
        TasksService.getTasksByName(vm.model.search),
        LecturesService.getLecturesByName(vm.model.search),
        StudentsService.getStudentsByName(vm.model.search)
      ]).then(
        function (data) {
          console.log(data);
          _.each(data[0].data, function (course) {
            vm.util.searchFct.searchResults.push({
              _id : course._id,
              name: course.name,
              createdDate: course.createdDate, 
              type: 'Курс'});
          });
          _.each(data[1].data, function (course_e) {
            vm.util.searchFct.searchResults.push({
              _id : course_e._id,
              name: course_e.name,
              createdDate: course_e.createdDate, 
              type: 'Потік'});
          });
          _.each(data[2].data, function (task) {
            vm.util.searchFct.searchResults.push({
              _id : task._id,
              name: task.name,
              createdDate: task.createdDate, 
              type: 'Завдання'});
          });
          _.each(data[3].data, function (lecture) {
            vm.util.searchFct.searchResults.push({
              _id : lecture._id,
              name: lecture.name,
              createdDate: lecture.createdDate, 
              type: 'Лекція'});
          });
          _.each(data[4].data.users, function (user) {
            vm.util.searchFct.searchResults.push({
              _id : user._id,
              name: user.firstName + ' ' + user.lastName, 
              createdDate: user.createdDate,
              type: 'Студент'});
          });
          console.log(vm.util.searchFct.searchResults);
          vm.model.search = ''
          $state.go('content.search')
        }
      );
    }
  }
}