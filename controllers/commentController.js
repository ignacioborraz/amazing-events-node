const Comment = require('../models/Comment')

const commentController = {

    create: async (req, res) => {
        const {
            comment,
            user,
            event,
            date
        } = req.body

        try {
            await new Comment(req.body).save()

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
        try {
            let comments = await Comment.find()

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
        const {id} = req.params
        try {
            let comment = await Comment.findOne({_id:id})
            if (comment) {
                await Comment.findOneAndUpdate({_id:id},req.body,{new: true})
                res.status(200).json({
                    message: "comment updated",
                    success: true
                })
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
        const {id} = req.params
        try {
            let comment = await Comment.findOne({_id:id})
            if (comment) {
                await Comment.findOneAndDelete({_id:id})
                res.status(200).json({
                    message: "comment deleted",
                    success: true
                })
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