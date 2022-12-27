const {Schema, Types, model} = require('mongoose')
//const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
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
        type: Types.ObjectId,
        ref: 'categories',
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
        type: Number,
        required: false,
        default: null,
    },
    price: {
        type: Number,
        required: true,
    },
    permition: {
        type: Boolean,
        default: false,
    }
})

//schema.plugin(mongoosePaginate)

module.exports = model(
    'events',
    schema
)
