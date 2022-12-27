const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'events',
        required: true
    }
})

module.exports = mongoose.model('likes', schema)
