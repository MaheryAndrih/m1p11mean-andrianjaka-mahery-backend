const workSchedule = require('../models/work_shedule');

const getWorkScheduleByEmployeeId = async (req, res) => {
    const employee_id = req.query.employeeId;

    workSchedule.WorkSchedule.find({employee_id: employee_id})
    .then(
        schedule => {
            res.json(schedule);
        }
    )
    .catch(error => res.json(error));
}

const updateWorkSchedule = async(req, res) => {
    const schedule = req.body;
    const criteria = {employee_id: schedule.employee_id};
    const updateData = { $set: { 'work_schedule': schedule.work_schedule } };

    workSchedule.WorkSchedule.updateMany(criteria, updateData, {new: true, multi: true})
    .then(
        schedule => { 
            res.json(schedule);
         }
    )
    .catch(
        err => {
            res.json(err);
        }
    );
}

module.exports = {getWorkScheduleByEmployeeId, updateWorkSchedule};