const router = require('express').Router()

const uController = require('./usersController');
const secured = require('../utils/secured');

router.post('/register', uController.registerUser);
router.post('/login', uController.loginUser);
router.get('/users', secured, uController.getAllUsers);

module.exports = router 