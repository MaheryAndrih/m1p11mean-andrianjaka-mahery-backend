const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        heure: {
            type: String,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        employe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        services: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
        },
        rappel: {
            type: Number,
            required: true,
        },
        ispayed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('appointement', appointmentSchema); 