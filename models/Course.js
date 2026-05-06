const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    trainer: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration must be greater than 0']
    },
    fees: {
        type: Number,
        required: true,
        min: [1, 'Fees must be greater than 0']
    }
});
module.exports = mongoose.model('Course', courseSchema);