const User = require('../models/User')

const userController = {

    create: async (req, res) => {
        const {
            name,
            lastName,
            email,
            pass,
            photo
        } = req.body

        try {
            await new User(req.body).save()

            res.status(201).json({
                message: 'user created',
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "could't create user",
                success: false
            })
        }
    },

    all: async (req, res) => {
        try {
            let users = await User.find()

            res.status(200).json({
                message: "you get users",
                response: users,
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
            let user = await User.findOne({
                _id: id
            })
            
            if (user) {
                res.status(200).json({
                    message: "you get one user",
                    response: user,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find user",
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
            let user = await User.findOne({_id:id})
            if (user) {
                await User.findOneAndUpdate({_id:id},req.body,{new: true})
                res.status(200).json({
                    message: "user updated",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find user",
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
            let user = await User.findOne({_id:id})
            if (user) {
                await User.findOneAndDelete({_id:id})
                res.status(200).json({
                    message: "user deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "could't find user",
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

module.exports = userController