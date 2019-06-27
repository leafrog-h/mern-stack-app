const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    exercise: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    exerciseKey: {
        type: String,
        required: true
    }
});
const Exercise = mongoose.model('exercise', exerciseSchema)
module.exports = Exercise;
