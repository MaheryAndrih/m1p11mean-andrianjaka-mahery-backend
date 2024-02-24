const router = require('express').Router();
const statController = require('../controllers/stats.controller');

router.route('/sales-volume')
    .get(statController.salesVolume)

module.exports = router;