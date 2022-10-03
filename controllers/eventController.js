const Event = require('../models/Event')
const validator = require('../schemas/event')

const eventController = {
    
    create: async (req, res) => {
        if (req.user.role === 'admin') {
            try {
                await validator.validateAsync(req.body,{abortEarly:false})
                let event = await new Event(req.body).save()
                res.status(201).json({
                    message: 'event created',
                    success: true,
                    id: event._id
                })
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    message: error.message,
                    success: false
                })
            }
        } else {
            res.status(400).json({
                message: "unathorized",
                success: false
            })
        }
    },

    all: async (req, res) => {
        let events
        let order = 'desc'
        let paginator = {
            page: 1,
            limit: 12
        }
        let query = {}


        if (req.query.category) {
            query.category = new RegExp(req.query.category, 'i')
        }

        if (req.query.name) {
            query.name = new RegExp(req.query.name, 'i')
        }

        if (req.query.order) {
            order = req.query.order
        }

        if (req.query.page) {
            paginator.page = req.query.page
        }

        if (req.query.limit) {
            paginator.limit = req.query.limit
        }
        console.log(req.query)

        try {
            events = await Event.paginate(query,{ ...paginator, sort: {date: req.query.order}})
                //.sort({date:order})

            res.json(events)
        } catch (err) {
            console.log(err)
            res.status(500).json()
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
    },

    update: async (req, res) => {
        const {
            id
        } = req.params
        if (req.user.role === 'admin') {
            try {
                let event = await Event.findOne({
                    _id: id
                })
                if (event) {
                    await Event.findOneAndUpdate({
                        _id: id
                    }, req.body, {
                        new: true
                    })
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
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    message: "error",
                    success: false
                })
            }        
        } else {
            res.status(400).json({
                message: "unathorized",
                success: false
            })
        }
    },
    
    destroy: async (req, res) => {
        const {
            id
        } = req.params
        if (req.user.role === 'admin') {
            try {
                let event = await Event.findOne({
                    _id: id
                })
                if (event) {
                    await Event.findOneAndDelete({
                        _id: id
                    })
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
            } catch (error) {
                console.log(error)
                res.status(400).json({
                    message: "error",
                    success: false
                })
            }
        } else {
            res.status(400).json({
                message: "unathorized",
                success: false
            })
        }
    },
    
    like: async (req,res) => {
        let { id } = req.params
        let userId = req.user.id
        try { 
            let event = await Event.findOne({_id:id}) 
            if (event.likes.includes(userId)) {
                event.likes.pull(userId)
                await event.save()
                res.status(200).json({
                    message: "event disliked",
                    success: true
                })
            } else {
                event.likes.push(userId)
                await event.save()
                res.status(200).json({
                    message: "event liked",
                    success: true
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

    likeWithMongoose: async (req,res) => {
        let { id } = req.params
        let userId = req.user.id
        try { 
            let event = await Event.findOne({_id:id}) 
            if (event.likes.includes(userId)) {
                await Event.findOneAndUpdate({_id:id}, {$pull:{likes:userId}}, {new:true})
                res.status(200).json({
                    message: "event disliked",
                    success: true
                })
            } else {
                await Event.findOneAndUpdate({_id:id}, {$push:{likes:userId}}, {new:true})
                res.status(200).json({
                    message: "event liked",
                    success: true
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

/*
Métodos de mongoose:
    $pull quita eleme1ntos de un array
    $push agrega elementos a un array
    $set modifica elementos de un array
*/