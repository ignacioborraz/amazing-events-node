require('dotenv').config()

// Importamos la conexion a la base de datos
const db = require('./config/database')

// Importar los modelos que necesito para las operaciones
const Event = require('./models/Event')

for (let i = 0; i < 40; i++) {
    Event.create({
        name : "Mind Hub Graduation",
        image: "http://localhost:4000/",
        date : "2022-12-01",
        description : "Graduacion de Mindhub",
        category : "Tecnologia",
        place: "Luna Park", 
        capacity: 5000,
        assistance: "",
        estimated : 100,
        price: 0,
    })
}
