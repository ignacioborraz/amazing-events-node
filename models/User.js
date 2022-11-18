const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    pass: [{
        type: String,
        required: true
    }],

    role: {
        type: String,
        required: true
    },

    from: [{
        type: String,
        required: true
    }],

    logged: {
        type: Boolean,
        required: true
    },

    verified: {
        type: Boolean,
        required: true
    },

    code: {
        type: String,
        required: true
    },
})

const options = {
    statics: {
        findByEmail(email) {
            return this.find({email});
        }
    }
}

const User = mongoose.model('users', schema, options)

module.exports = User
