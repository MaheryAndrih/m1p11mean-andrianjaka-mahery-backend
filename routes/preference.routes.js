const router = require('express').Router();

const preferenceController = require('../controllers/preference.controller');

router.get('/:id',preferenceController.getCustomerPreferences);
router.post('',preferenceController.createPreferences);
router.put('/:id',preferenceController.updatePreference);

module.exports = router;