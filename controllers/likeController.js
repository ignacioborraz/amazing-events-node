const Like = require('../models/Like')

const controller = {
    
    create: async (req, res) => {
        let user = req.user.id
        let { event } = req.params
        try {
            let like = await Like.find({ user,event })
            if (like.length>0) {
                await Like.findOneAndDelete({ user,event })
                res.status(201).json({
                    message: 'disliked',
                    success: true,
                })
            } else {
                await new Like({ user,event }).save()
                res.status(201).json({
                    message: 'liked',
                    success: true,
                })
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
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
            let likes = await Like.find(query)
            if (likes) {
                res.json({ likes: likes.length })    
            } else {
                res.json({ likes: 0 })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    }

}

module.exports = controller