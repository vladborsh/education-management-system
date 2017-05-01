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
		url: '/courses',
		views: { 
			'main' : {
				templateUrl: 'app/courses/courses.html',
				controller: 'CoursesController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.course_item', {
		url: '/course_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/courses/course-item.html',
				controller: 'CourseItemController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.course_e_item', {
		url: '/course_e_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/courses/course-entry-item.html',
				controller: 'CourseEntryItemController',
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
	.state('content.task_item', {
		url: '/task_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/tasks/task-item.html',
				controller: 'TaskItemController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.task_e_item', {
		url: '/task_e_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/tasks/task-entry-item.html',
				controller: 'TaskEntryItemController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.task_result', {
		url: '/task_result/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/tasks/task-result-item.html',
				controller: 'TaskResultItemController',
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
	.state('content.lecture_item', {
		url: '/lecture_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/lectures/lecture-item.html',
				controller: 'LectureItemController',
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
	.state('content.student_item', {
		url: '/student_item/{id}',
		views: { 
			'main' : {
				templateUrl: 'app/students/student-item.html',
				controller: 'StudentItemController',
				controllerAs: 'vm'
			}
		}
	})
	.state('content.users', {
		url: '/users',
		views: { 
			'main' : {
				templateUrl: 'app/users/users.html',
				controller: 'UsersController',
				controllerAs: 'vm'
			}
		}
	})
	$urlRouterProvider.otherwise('/login/signin');

	$httpProvider.interceptors.push('AuthInterceptorFactory')
}