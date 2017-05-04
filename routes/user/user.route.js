var controller = require('./user.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.post('/signup', controller.signup);
router.post('/auth', controller.auth);
router.delete('/:id', auth.isAuthenticated, controller.remove);
router.get('/', auth.isAuthenticated, controller.getAllUsers);
router.get('/role', auth.isAuthenticated, controller.role);
router.get('/admins', auth.isAuthenticated, controller.getAdmins);
router.get('/teachers', auth.isAuthenticated, controller.getTeachers);
router.get('/students', auth.isAuthenticated, controller.getStudents);
router.get('/info', auth.isAuthenticated, controller.getInfo);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/:id', auth.isAuthenticated, controller.update);
router.get('/:id/student_items', auth.isAuthenticated, controller.getStudentItemsForUser);

module.exports = router;
