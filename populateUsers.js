require('dotenv').config()
require('./config/database')
const User = require('./models/User')

User.create({
    name: "eric",
    lastName: "rodriguez",
    email: "ericrod@hotmail.com",
    pass: "Hola1234",
    photo: "eric.png"
})