const router = require('express').Router();

const appointmentController = require('../controllers/appointement.controller');

router.post('',appointmentController.createAppointement);
router.get('',appointmentController.getAllAppointement);
router.get('/:id',appointmentController.getAppointmentById);
router.delete('/:id',appointmentController.deleteAppointement);
router.get('/historique/:id',appointmentController.getHistoriqueUser);
router.get('/list/:id',appointmentController.getAppointmentList);
router.patch('/payed/:id',appointmentController.payedAppointment);
router.patch('/unpayed/:id',appointmentController.unpayedAppointment);
router.get('/task/:id',appointmentController.getTaskCommission);
router.get('/stat/reservation',appointmentController.getAppointmentsCountByMonth);
router.get('/stat/reservation/jour',appointmentController.getAppointmentsCountByWeek);
router.get('/stat/schedule',appointmentController.getEmployeScheduleByMonth);
router.get('/stat/schedule/jour',appointmentController.getEmployeScheduleByWeek);
router.post('/sendEmail',appointmentController.sendEmail);
router.post('/search',appointmentController.searchService);
router.post('/achivement/:id',appointmentController.getAppointmentEtat);
router.put('/achivement/:id',appointmentController.updateAppointmentEtat);

module.exports = router;