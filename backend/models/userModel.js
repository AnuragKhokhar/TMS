const mongoose = require('mongoose');

//create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    course: {
        type: 'string',
        required: true,

    },
    venue: {
        type: 'string',
        required: true,
    },
    startDate: {
        type: 'date',
        required: true
    },
    endDate: {
        type: 'date',
        required: true
    }

}, { timestamps: true });


const User = mongoose.model('Training', userSchema)

module.exports = User