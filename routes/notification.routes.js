const router = require('express').Router();
const notificationController = require('../controllers/notification.controller');
const notficationMiddlware = require('../middleware/notificationMiddleware');

router.route('/')
.post(notficationMiddlware.interceptSubscription,notificationController.receiveSubscription)
.get(notificationController.sendPushNotification);

module.exports = router;