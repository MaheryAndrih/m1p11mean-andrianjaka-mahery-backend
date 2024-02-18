const router = require('express').Router();

const serviceController = require('../controllers/service.controller');

router.get('',serviceController.getAllServices);
router.post('',serviceController.createService);
router.put('/:id',serviceController.updateService);
router.delete('/:id',serviceController.deleteService);
router.get('/:id',serviceController.getServiceById);

module.exports = router;