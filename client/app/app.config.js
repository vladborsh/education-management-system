Config.$injector = [
'$stateProvider', 
'$urlRouterProvider', 
'$httpProvider'
];
function Config(
	$stateProvider, 
	$urlRouterProvider,
	$httpProvider) 
{
	$stateProvider
	.state('login', {
		url: '/login',
		views: { 
			'index' : {
				templateUrl: 'app/general/templates/login.html'
			}
		}
	})
	.state('login.signin', {
		url: '/signin',
		views: { 
			'main' : {
				templateUrl: 'app/signin/signin.html',
				controller: 'SignInController',
				controllerAs: 'vm'
			}
		}
	})
	.state('login.forgotpass', {
		url: '/forgotpass',
		views: { 
			'main' : {
				templateUrl: 'app/forgot-pass/forgot-pass.html',
				controller: 'ForgotPassController',
				controllerAs: 'vm'
			}
		}
	})
	.state('login.signup', {
		url: '/signup',
		views: { 
			'main' : {
				templateUrl: 'app/signup/signup.html',
				controller: 'SignUpController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content', {
		url: '/content',
		views: { 
			'index' : {
				templateUrl: 'app/general/templates/content.html',
				controller: 'WrapContentController',
				controllerAs: 'wrap'
			}
		}
	})
	.state('content.home', {
		url: '/home',
		views: { 
			'main' : {
				templateUrl: 'app/home/home.html',
				controller: 'HomeController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.courses', {
		url: '/courses/{type}/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/courses/courses.html',
				controller: 'CoursesController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.tasks', {
		url: '/tasks',
		views: { 
			'main' : {
				templateUrl: 'app/tasks/tasks.html',
				controller: 'TasksController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.lectures', {
		url: '/lectures',
		views: { 
			'main' : {
				templateUrl: 'app/lectures/lectures.html',
				controller: 'LecturesController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.students', {
		url: '/students',
		views: { 
			'main' : {
				templateUrl: 'app/students/students.html',
				controller: 'StudentsController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.calendar', {
		url: '/calendar',
		views: { 
			'main' : {
				templateUrl: 'app/calendar/calendar.html',
				controller: 'CalendarController',
				controllerAs: 'vm'
			}
		}
	})
	$urlRouterProvider.otherwise('/login/signin');

	$httpProvider.interceptors.push('AuthInterceptorFactory')
}