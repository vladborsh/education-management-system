var controller = require('./lecture.controller');
var auth = require('../../utils/auth');
var router = require('express').Router();

router.get('/', auth.isAuthenticated, controller.getAll);
router.get('/:id', auth.isAuthenticated, controller.get);
router.post('/', auth.isAuthenticated, auth.isAdmin, controller.create);
router.post('/:id', auth.isAuthenticated, auth.isAdmin, controller.update);
router.delete('/:id', auth.isAuthenticated, auth.isAdmin, controller.remove);

module.exports = router;
