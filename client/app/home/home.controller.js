HomeController.$inject = [
  'HomeFactory',
  'CoursesService',
  'TasksService',
  'StudentsService',
  'Modal',
  'User',
  '$q'
];
function HomeController(
  HomeFactory,
  CoursesService,
  TasksService,
  StudentsService,
  Modal,
  User,
  $q) 
{
	var vm = this;

  vm.model = HomeFactory.getModel();

  vm.init = function () {
    User.setup()
    .then(
      function (data) {
        return CoursesService.getCourseEntriesByLector(User.getUserId());
      }
    )
    .then(
      function (data) {
        vm.model.courseEntries = data.data;
        var promises = [];
        _.each(vm.model.courseEntries, function (e) {
          promises.push(CoursesService.getTaskEntries(e._id));
        });
        vm.model.taskEntries = [];
        return $q.all(promises);
      }
    )
    .then(
      function (data) {
        _.each(data, function (i) {
          console.log(i.data.items)
          _.each(i.data.items, function (j) {
            vm.model.taskEntries.push(j);
          })
        })
        var promises = [];
        _.each(vm.model.courseEntries, function (e) {
          promises.push(CoursesService.getStudents(e._id));
        });
        vm.model.students = [];
        return $q.all(promises);
      }
    )
    .then(
      function (data) {
        _.each(data, function (i) {
          console.log(i.data.items)
          _.each(i.data.items, function (j) {
            vm.model.students.push(j);
          })
        })
      }
    );
  }
  vm.init();

  vm.deleteCourseEntry = function(id) {
    CoursesService.deleteCourseEntry(id)
    .then(
      function( data ) {
        _.remove(vm.model.courseEntries, function(item) {
          return item._id == id;
        });
        _.remove(vm.model.myCourses, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteTaskEntry = function(id) {
    TasksService.deleteEntry(id)
    .then(
      function( data ) {
        _.remove(vm.model.taskEntries, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

  vm.deleteStudent = function(id) {
    StudentsService.delete(id)
    .then(
      function( data ) {
        _.remove(vm.model.students, function(item) {
          return item._id == id;
        });
        console.log(data);
      },
      function( err ) {
        console.log(err);
      }
    );
  }

}