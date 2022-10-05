require('dotenv').config()

// Importamos la conexion a la base de datos
const db = require('./config/database')

// Importar los modelos que necesito para las operaciones
const Category = require('./models/Category')

let categories = [
    {
        name: "Food Fair",
        description: "complete later",
    },{
        name: "Museum",
        description: "complete later",
    },{
        name: "Costume Party",
        description: "complete later",
    },{
        name: "Music Concert",
        description: "complete later",
    },{
        name: "Race",
        description: "complete later",
    },{
        name: "Book Exchange",
        description: "complete later",
    },{
        name: "Cinema",
        description: "complete later",
    }
]

categories.forEach(category => {
    Category.create({
        name: category.name,
        description: category.description
    })
})