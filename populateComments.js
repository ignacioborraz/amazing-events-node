require('dotenv').config()
require('./config/database')
const Comment = require('./models/Comment')

Comment.create({
    comment: "",
    user: "",
    event: "",
    date: new Date()
})