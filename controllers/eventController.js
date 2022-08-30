const Event = require('../models/Event')

const eventController = {
    create: async (req, res) => {
        //const {name,image,date,description,category,place,capacity,estimated,price} = req.body
        try {
            await new Event(req.body).save()

            res.status(201).json({
                message: 'event created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "could't create event",
                success: false
            })
        }
    },

    read: async (req, res) => {
        const {
            id
        } = req.params
        try {
            let event = await Event.findOne({
                _id: id
            })
            
            if (event) {
                res.status(200).json({
                    message: "you get one event",
                    response: event,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find event",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)

            res.status(400).json({
                message: "error",
                success: false
            })
        }
    }
}

module.exports = eventController