const router = require('express').Router();
const notificationController = require('../controllers/notification.controller');

router.route('/')
.post(notificationController.receiveSubscription);

module.exports = router;