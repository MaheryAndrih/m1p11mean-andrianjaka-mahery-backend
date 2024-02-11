const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/authentication.controller');
const verifyToken = require('../middleware/authMiddleware');
router.route('/')
    .get(verifyToken,userController.getAllUsers)
    .post(userController.saveUser);

router.route('/id')
    .get(verifyToken, userController.getUserById);
        
router.route('/privileges').get(userController.getAllPrivileges);

router.route('/login')
    .post(authController.login)
module.exports = router;