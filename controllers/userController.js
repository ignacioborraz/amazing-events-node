const User = require('../models/User')
const crypto = require('crypto') 
const bcryptjs = require('bcryptjs') 
const sendMail = require('./sendMail')
const validator = require('../schemas/user')
const jwt = require('jsonwebtoken')

const userController = {

    signUp: async (req, res) => {
        let {
            name,
            photo,
            email,
            pass,
            role, 
            from 
        } = req.body
        try {
            await validator.validateAsync(req.body, {
                abortEarly: false
            })
            let user = await User.findOne({
                email
            })
            if (!user) {
                let logged = false
                let verified = false
                let code = crypto 
                    .randomBytes(15) 
                    .toString('hex')
                if (from === 'form') { 
                    pass = bcryptjs.hashSync(pass, 10) 
                    user = await new User({
                        name,
                        photo,
                        email,
                        pass: [pass],
                        role,
                        from: [from],
                        logged,
                        verified,
                        code
                    }).save() 
                    sendMail(email, code)
                    res.status(201).json({
                        message: "user signed up from form",
                        success: true
                    })
                } else { 
                    pass = bcryptjs.hashSync(pass, 10) 
                    verified = true
                    user = await new User({
                        name,
                        photo,
                        email,
                        pass: [pass],
                        role,
                        from: [from],
                        logged,
                        verified,
                        code
                    }).save()
                    res.status(201).json({
                        message: "user signed up from " + from,
                        success: true
                    })
                }
            } else { 
                if (user.from.includes(from)) { 
                    res.status(400).json({ 
                        message: "user already exists",
                        success: false 
                    })
                } else { 
                    user.from.push(from)
                    user.verified = true
                    pass = bcryptjs.hashSync(pass, 10) 
                    user.pass.push(pass) 
                    await user.save() 
                    res.status(201).json({
                        message: "user signed up from " + from,
                        success: true
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },

    verifyMail: async (req, res) => {
        const {
            code
        } = req.params
        try {
            let user = await User.findOne({
                code
            })
            if (user) {
                user.verified = true 
                await user.save() 
                res.redirect('https://amazing-e.herokuapp.com/')
            } else {
                res.status(404).json({
                    message: "email has not account yet",
                })
            }
        } catch (err) {
            res.status(404).json({
                message: "email has not account yet",
            })
        }
    },

    signIn: async (req, res) => {
        const {
            email,
            pass
        } = req.body
        try {
            const user = await User.findOne({
                email
            })
            if (!user) { 
                res.status(404).json({
                    success: false,
                    message: "User doesn't exists, please sign up"
                })
            } else if (user.verified) {
                const checkPass = user.pass.filter(password => bcryptjs.compareSync(pass, password))
                if (checkPass.length > 0) {
                    user.logged = true
                    await user.save()
                    const data = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        photo: user.photo
                    }
                    const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                    res.status(200).json({
                        success: true,
                        response: {
                            user: data,
                            token: token
                        },
                        message: 'Welcome ' + user.name+'!'
                    })
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Username or password incorrect'
                    })
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Please, verify your email account and try again'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Sign in ERROR, try again later'
            })
        }
    },

    verifyToken:(req, res) => {
        //console.log(req.user)
        if (!req.err) {            
            const token = jwt.sign({id: req.user.id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
            res.status(200).json({
                success: true,
                response: {
                    user: req.user,
                    token: token
                },
                message: 'Welcome ' + req.user.name+'!'
            })
        } else {
            res.json({
                success:false,
                message:"sign in please!"}) 
        }
    },

    signOut: async (req, res) => {
        const {
            email
        } = req.body
        try {
            const user = await User.findOne({
                email
            })
            user.logged = false
            await user.save()
            res.status(200).json({
                success: true,
                message: email + ' sign out!'
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error",
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
            res.status(400).json({
                message: "error",
            })
        }
    },

    update: async (req, res) => {
        const {
            id
        } = req.params
        try {
            let user = await User.findOne({
                _id: id
            })
            if (user) {
                await User.findOneAndUpdate({
                    _id: id
                }, req.body, {
                    new: true
                })
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
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    },

    destroy: async (req, res) => {
        const {
            id
        } = req.params
        try {
            let user = await User.findOne({
                _id: id
            })
            if (user) {
                await User.findOneAndDelete({
                    _id: id
                })
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
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error",
                success: false
            })
        }
    }
}

module.exports = userController