const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'service',
            required: true,
        },
        employe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('preference', preferenceSchema); 