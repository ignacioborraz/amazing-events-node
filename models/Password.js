const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'users',
    },

    value: {
        type: Types.String,
        required: true
    },
})

const User = model('passwords', schema)

module.exports = User
