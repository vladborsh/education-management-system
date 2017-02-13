var controller = require('./user.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', controller.getAllUsers);
router.post('/signup', controller.signup);
router.post('/auth', controller.auth);
router.get('/role', auth.isAuthenticated, controller.role);

module.exports = router;
