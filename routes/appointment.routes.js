const router = require('express').Router();

const appointmentController = require('../controllers/appointement.controller');

router.post('',appointmentController.createAppointement);
router.get('',appointmentController.getAllAppointement);
router.get('/historique/:id',appointmentController.getHistoriqueUser);
router.get('/list/:id',appointmentController.getAppointmentList);
router.delete('/:id',appointmentController.deleteAppointement);
router.patch('/payed/:id',appointmentController.payedAppointment);
router.patch('/unpayed/:id',appointmentController.unpayedAppointment);
router.get('/:id',appointmentController.getAppointmentById);

module.exports = router;