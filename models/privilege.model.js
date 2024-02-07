const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const privilegeSchema = new Schema({
    code: String,
    name: String
},
{
    timestamps: false,
});

const Privilege = mongoose.model('Privilege', privilegeSchema);

module.exports = {Privilege};