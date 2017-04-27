
angular.module('App', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngCookies'])
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

.service('CoursesService', CoursesService)
.factory('CoursesFactory', CoursesFactory)
.controller('HomeController', HomeController)
.controller('CoursesController', CoursesController)
.controller('NewCourseEntryController', NewCourseEntryController)
.controller('NewCourseController', NewCourseController)
.controller('CourseItemController', CourseItemController)

.service('TasksService', TasksService)
.controller('TasksController', TasksController)

.service('LecturesService', LecturesService)
.controller('LecturesController', LecturesController)

.service('StudentsService', StudentsService)
.controller('StudentsController', StudentsController)

.service('CalendarService', CalendarService)
.controller('CalendarController', CalendarController)