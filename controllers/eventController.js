const Event = require('../models/Event')

const eventController = {
    create: async(req,res) => {
        //const {name,image,date,description,category,place,capacity,estimated,price} = req.body
        try {
            await new Event(req.body).save() //req.body tiene que tener si o si todas las variables antes descriptas
            //espero un nuevo modelo EVENTO y lo guardo en la base de datos
            res.status(201).json({
                message: 'event created',
                success: true
            })
        } catch(error) {
            res.status(400).json({
                message: "could't create event",
                success: false
            })
        }
    }
}

module.exports = eventController