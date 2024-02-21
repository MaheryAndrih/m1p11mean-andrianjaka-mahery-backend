const router = require('express').Router();
const specialOfferController = require('../controllers/specialOffer.controller');

router.route('/')
.post(specialOfferController.saveSpecialOffer)
.get(specialOfferController.getAllSpecialOffers);

router.route('/:id')
.put(specialOfferController.updateSpecialOffer);

module.exports = router;