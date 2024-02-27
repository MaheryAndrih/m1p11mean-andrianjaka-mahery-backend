const router = require('express').Router();

const depenseController = require('../controllers/depense.controller');

router.get('',depenseController.getDepense);
router.post('',depenseController.createDepense);

module.exports = router;