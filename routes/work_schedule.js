const router = require('express').Router();
const workScheduleCotroller = require('../controllers/work_schedule.controller');
const verifyToken = require('../middleware/authMiddleware');

router.route('/')
    .get(workScheduleCotroller.getWorkScheduleByEmployeeId)
    .put(workScheduleCotroller.updateWorkSchedule)
    .post(workScheduleCotroller.saveWorkSchedule);
        
router.route('/:id').delete(workScheduleCotroller.deleteWorkSchedule);
module.exports = router;