const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.saveUser);

router.route('/privileges').get(userController.getAllPrivileges);
module.exports = router;