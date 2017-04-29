
angular.module('App', [
  'ui.bootstrap', 
  'ui.router', 
  'ngAnimate', 
  'ngCookies',
  'ngSanitize',
  'textAngular'
])
.factory('AuthFactory', AuthFactory)
.factory('AuthInterceptorFactory', AuthInterceptorFactory)
.factory('CommonFactory', CommonFactory)
.config(Config)

.factory('User', User)
.service('Remote', Remote)
.service('Modal', Modal)
.service('DateService', DateService)

.service('SignInService', SignInService)
.controller('SignInController', SignInController)

.service('SignUpService', SignUpService)
.controller('SignUpController', SignUpController)

.controller('ForgotPassController', ForgotPassController)
.controller('WrapContentController', WrapContentController)
.controller('TopbarController', TopbarController)
.controller('NavigationController', NavigationController)

.factory('CoursesFactory', CoursesFactory)
.service('CoursesService', CoursesService)
.controller('HomeController', HomeController)
.controller('CoursesController', CoursesController)
.controller('NewCourseEntryController', NewCourseEntryController)
.controller('NewCourseController', NewCourseController)
.controller('CourseItemController', CourseItemController)
.controller('CourseEntryItemController', CourseEntryItemController)

.factory('TasksFactory', TasksFactory)
.service('TasksService', TasksService)
.controller('TasksController', TasksController)
.controller('NewTaskController', NewTaskController)
.controller('TaskItemController', TaskItemController)
.controller('NewTestController', NewTestController)
.controller('NewWorkController', NewWorkController)
.controller('NewTaskEntryController', NewTaskEntryController)

.factory('LecturesFactory', LecturesFactory)
.service('LecturesService', LecturesService)
.controller('LecturesController', LecturesController)
.controller('NewLectureController', NewLectureController)
.controller('LectureItemController', LectureItemController)

.service('StudentsService', StudentsService)
.controller('StudentsController', StudentsController)
.controller('NewStudentController', NewStudentController)


.service('CalendarService', CalendarService)
.controller('CalendarController', CalendarController)