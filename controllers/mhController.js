const Event = require('../models/Event')
const validator = require('../schemas/event')

const controller = {

    create: async (req,res) => {
        try {
            req.body.permition = true
            await validator.validateAsync(req.body,{ abortEarly:false })
            await new Event(req.body).save()
            res.status(201).json({
                message: 'event created',
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },

    all: async (req, res) => {
        let events
        let order = 'desc'
        let paginator = { page: 1,limit: 12 }
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
        try {
            events = await Event.find(query)
                .skip(paginator.page > 0 ? ((paginator.page - 1 ) * paginator.limit) : 0)
                .limit(paginator.limit)
                .sort({ date: req.query.order })
                .populate('category',{ name:1 })
            res.json(events)
        } catch (err) {
            console.log(err)
            res.status(500).json()
        }
    },

    one: async (req, res) => {
        const { id } = req.params
        try {
            let event = await Event.findOne({ _id: id })
            if (event) {
                res.status(200).json(event)
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
        const { id } = req.params
        try {
            let event = await Event.findOne({ _id: id })
            if (event?.permition) {
                await Event.findOneAndUpdate({ _id: id },req.body,{new: true })
                res.status(200).json({
                    message: "event updated",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find or update event",
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

    destroy: async (req, res) => {
        const { id } = req.params
        try {
            let event = await Event.findOne({ _id: id })
            if (event?.permition) {
                await Event.findOneAndDelete({ _id: id })
                res.status(200).json({
                    message: "event deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find or destroy event",
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

module.exports = controller