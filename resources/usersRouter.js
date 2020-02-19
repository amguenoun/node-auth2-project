const router = require('express').Router()

const uController = require('./usersController');

router.post('/register', uController.registerUser);
router.post('/login', uController.loginUser);
router.get('/users', uController.getAllUsers);

module.exports = router 