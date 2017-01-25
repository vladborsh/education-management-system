
angular.module('App', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngCookies'])
.factory('AuthFactory', AuthFactory)
.factory('AuthInterceptorFactory', AuthInterceptorFactory)
.config(Config)
.service('SignInService', SignInService)
.service('SignUpService', SignUpService)
.controller('SignInController', SignInController)
.controller('SignUpController', SignUpController)
.controller('ForgotPassController', ForgotPassController)
.controller('HomeController', HomeController);