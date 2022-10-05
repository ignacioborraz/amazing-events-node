const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    description: {
        type: String,
        required: true,
        min: 3,
        max: 300
    }
})

const Category = mongoose.model('categories',schema)
module.exports = Category