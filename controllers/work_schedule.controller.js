const workSchedule = require('../models/work_shedule');

const saveWorkSchedule = async (req, res) => {
    const document = new workSchedule.WorkSchedule(req.body);
    document.save()
    .then(savedDoc => {
        res.json(savedDoc);
    })
    .catch(err => {
        res.json(err);
    });
}
const getWorkScheduleByEmployeeId = async (req, res) => {
    const employee_id = req.query.employeeId;

    workSchedule.WorkSchedule.findOne({employee_id: employee_id})
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

const deleteWorkSchedule = async(req, res) => {
    workSchedule.WorkSchedule.deleteOne({employee_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}
module.exports = {getWorkScheduleByEmployeeId, updateWorkSchedule, saveWorkSchedule, deleteWorkSchedule};