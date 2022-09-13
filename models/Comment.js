const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'events',
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