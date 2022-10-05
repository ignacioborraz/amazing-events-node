const Category = require('../models/Category')

const controller = {

    create: async (req, res) => {
        let { name,description } = req.body
        name = name.toLowerCase()
        try {
            await new Category({ name,description }).save()
            res.status(201).json({
                message: 'category created',
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "could't create category",
                success: false
            })
        }
    },

    all: async (req, res) => {
        let query = {}
        if (req.query.category) {
            query.name = new RegExp(req.query.category, 'i')
        }
        try {
            let categories = await Category.find(query)
                        
            if (categories) {
                res.status(200).json(categories)
            } else {
                res.status(404).json({
                    message: "could't find Category",
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

    one: async (req, res) => {
        const { id } = req.params
        try {
            let category = await Category.findOne({ _id: id })            
            if (category) {
                res.status(200).json(category)
            } else {
                res.status(404).json({
                    message: "could't find Category",
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
        const { id } = req.params
        try {
            let category = await Category.findOne({ _id:id })
            if (category) {
                await Category.findOneAndUpdate({ _id:id },req.body,{ new: true })
                res.status(200).json({
                    message: "category updated",
                    success: true
                })             
            } else {
                res.status(404).json({
                    message: "could't find category",
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
            let category = await Category.findOne({ _id:id })
            if (category) {
                    await Category.findOneAndDelete({ _id:id })
                    res.status(200).json({
                        message: "category deleted",
                        success: true
                    })
                } else {
                    res.status(400).json({
                        message: "unathorized",
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

module.exports = controller