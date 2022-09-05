const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model(
    'comments',
    schema
)