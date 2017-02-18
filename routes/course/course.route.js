var controller = require('./course.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, auth.isAdmin, controller.create);
router.post('/:id', auth.isAuthenticated, auth.isAdmin, controller.update);
router.delete('/:id', auth.isAuthenticated, auth.isAdmin, controller.remove);
router.post('/:id', auth.isAuthenticated, controller.upView);
router.get('/:id/tasks', auth.isAuthenticated, controller.getTasks);
router.get('/:id/lectures', auth.isAuthenticated, controller.getLectures);
router.get('/:id/entries', auth.isAuthenticated, controller.getEntries);

module.exports = router;
