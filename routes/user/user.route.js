var controller = require('./user.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', controller.getAllUsers);
router.post('/signup', controller.signup);
router.post('/auth', controller.auth);
router.delete('/:id', controller.remove);
router.get('/role', auth.isAuthenticated, controller.role);
router.get('/admins', auth.isAuthenticated, controller.getAdmins);
router.get('/teachers', auth.isAuthenticated, controller.getTeachers);
router.get('/students', auth.isAuthenticated, controller.getStudents);
router.get('/info', auth.isAuthenticated, controller.getInfo);

module.exports = router;
