const Comment = require('../models/Comment')

const commentController = {

    create: async (req, res) => {
        let user = req.user.id
        let date = new Date()
        const {
            comment,
            event
        } = req.body

        try {
            await new Comment({comment,user,event,date}).save()

            res.status(201).json({
                message: 'comment created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "could't create comment",
                success: false
            })
        }
    },

    all: async (req, res) => {
        let query = {}

        if (req.query.user) {
            query.user = req.query.user
        }
        if (req.query.event) {
            query.event = req.query.event
        }

        try {
            let comments = await Comment.find(query)
                .populate('event',{name:1,image:1})
                .populate('user',{name:1,photo:1})

            res.status(200).json({
                message: "you get comments",
                response: comments,
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(500).json()
        }
    },

    read: async (req, res) => {
        const {id} = req.params

        try {
            let comment = await Comment.findOne({
                _id: id
            })
            
            if (comment) {
                res.status(200).json({
                    message: "you get one comment",
                    response: comment,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find comment",
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
        let user = req.user
        let date = new Date()
        const {id} = req.params
        const {
            comment
        } = req.body

        try {
            let com = await Comment.findOne({_id:id})
            if (com) {
                if (String(com.user) === String(user.id)) {
                    await Comment.findOneAndUpdate({_id:id},{comment,date},{new: true})
                    res.status(200).json({
                        message: "comment updated",
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: "unathorized",
                        success: false
                    })
                }                
            } else {
                res.status(404).json({
                    message: "could't find comment",
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
        let user = req.user
        const {id} = req.params
        try {
            let comment = await Comment.findOne({_id:id})
            if (comment) {
                if (String(com.user) === String(user.id)) {
                    await Comment.findOneAndDelete({_id:id})
                    res.status(200).json({
                        message: "comment deleted",
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: "unathorized",
                        success: false
                    })
                }
            } else {
                res.status(404).json({
                    message: "could't find comment",
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

module.exports = commentController