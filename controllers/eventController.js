const Event = require('../models/Event')

const eventController = {
    create: async (req, res) => {
        const {
            name,
            image,
            date,
            description,
            category,
            place,
            capacity,
            estimated,
            price
        } = req.body

        try {
<<<<<<< HEAD
            await new Event(req.body).save()

            res.status(201).json({
                message: 'event created',
                success: true
=======
            let event = await new Event(req.body).save()

            res.status(201).json({
                message: 'event created',
                success: true,
                id : event._id
>>>>>>> 002d1d4887cfcc7c1f6f0646c02604c69811446d
            })
        } catch (error) {
            res.status(400).json({
                message: "could't create event",
                success: false
            })
        }
    },

    all: async (req, res) => {
        let events
        let query = {}

        if (req.query.capacity) {
            query.capacity = req.query.capacity
        }

        if (req.query.name) {
            query.name = req.query.name
        }

        try {
            events = await Event.find(query)

            res.json(events)
        } catch (err) {
            console.log(err)
            res.status(500).json()
        }
    },

    read: async (req, res) => {
        const {id} = req.params

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
    },
    update: async(req,res) => {
        const {id} = req.params
        try {
            let event = await Event.findOne({_id:id})
            if (event) {
                await Event.findOneAndUpdate({_id:id},req.body,{new: true})
                res.status(200).json({
                    message: "event updated",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find event",
                    success: false
                })
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    },
    destroy: async(req,res) => {
        const {id} = req.params
        try {
            let event = await Event.findOne({_id:id})
            if (event) {
                await Event.findOneAndDelete({_id:id})
                res.status(200).json({
                    message: "event deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find event",
                    success: false
                })
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    }
}

module.exports = eventController