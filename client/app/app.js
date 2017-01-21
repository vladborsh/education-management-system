
angular.module('App', ['ui.bootstrap', 'ui.router', 'ngAnimate'])
.config(Config)
.controller('SignInController', SignInController)
.controller('SignUpController', SignUpController)
.controller('ForgotPassController', ForgotPassController)
.controller('HomeController', HomeController);