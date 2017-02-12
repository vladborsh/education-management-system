var controller = require('./user.controller');
var router = require('express').Router();

router.get('/', controller.getAllUsers);
router.post('/signup', controller.signup);
router.post('/auth', controller.auth);

module.exports = router;
