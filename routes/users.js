const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/authentication.controller');
//const verifyToken = require('../middleware/authMiddleware');
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.saveUser);

router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser);
        
router.route('/privileges').get(userController.getAllPrivileges);
router.route('/users-privilege/:privilege').get(userController.getUsersByPrivilege);
router.route('/login')
    .post(authController.login)
module.exports = router;