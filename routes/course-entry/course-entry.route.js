var controller = require('./course-entry.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, auth.isTeacher, controller.create);
router.post('/:id', auth.isAuthenticated, auth.isTeacher, controller.update);
router.delete('/:id', auth.isAuthenticated, auth.isTeacher, controller.remove);
router.get('/:id/tasks', auth.isAuthenticated, controller.getTasks);
router.get('/:id/students', auth.isAuthenticated, controller.getStudents);

module.exports = router;