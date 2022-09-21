const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    image: {
        type: String,
        required: true,
        validate: function (value) {
            if (! value.startsWith('http')) {
                throw new Error('La URL debe comenzar con http')
            }
        }
    },
    date: {
        type: Date,
        required: true
        // la fecha es futura
    },
    description: {
        type: String,
        required: true
        // maximo 300
    },
    category: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
        // min: 10
        // max: 50000
    },
    assistance: {
        type: Number
    },
    estimated: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }]
})

module.exports = mongoose.model(
    'events',
    schema
)