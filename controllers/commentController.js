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
        //deben tener TODAS las querys que piden las tareas correspondientes
        //va a ingresar una query llamada user que va a ser igual al id del usuario
        //      ?user=id123131     => esto lo escribo en el endpoint/ruta
        //      req.query.user = id123131
        //      ?usuario=id1234
        //      req.query.usuario = id1234
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
                //por defecto el 1 está para todos los campos del modelo evento (1 => true => mostrar dato)
                //si yo lo especifico, se cambian TODOS (0 => false => no mostrar) y solo muestra los que especifico

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