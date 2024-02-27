const mongoose = require('mongoose');

const depenseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('depense', depenseSchema); 