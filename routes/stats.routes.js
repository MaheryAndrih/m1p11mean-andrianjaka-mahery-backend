const router = require('express').Router();
const statController = require('../controllers/stats.controller');

router.route('/sales-volume')
    .get(statController.salesVolume)
router.route('/daily-sales-volume')
    .get(statController.dailySalesVolume)

module.exports = router;