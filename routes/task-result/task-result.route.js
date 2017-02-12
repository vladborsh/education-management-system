var controller = require('./task-result.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, controller.create);
router.post('/:id', auth.isAuthenticated, controller.update);
router.delete('/:id', auth.isAuthenticated, controller.remove);
router.get('/:id/tests', auth.isAuthenticated, controller.getTests);
router.get('/:id/works', auth.isAuthenticated, controller.getWorks);

module.exports = router;