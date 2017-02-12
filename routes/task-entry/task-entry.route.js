var controller = require('./task-entry.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, auth.isTeacher, controller.create);
router.post('/:id', auth.isAuthenticated, auth.isTeacher, controller.update);
router.delete('/:id', auth.isAuthenticated, auth.isTeacher, controller.remove);
router.post('/:id/assign', auth.isAuthenticated, auth.isTeacher, controller.assign);
router.get('/:id/results', auth.isAuthenticated, auth.isTeacher, controller.results);

module.exports = router;