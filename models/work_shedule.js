const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workScheduleSchema = new Schema({
    employee_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    work_schedule:{
        start_time: String,
        end_time: String,
        breaks: [
            {start_time: String, end_time: String}
        ]
    }
},
{
    timestamps: false,
});

const WorkSchedule = mongoose.model('Work_schedule', workScheduleSchema);

module.exports = {WorkSchedule, workScheduleSchema};