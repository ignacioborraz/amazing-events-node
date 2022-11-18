const User = require('../models/User')
const {randomBytes} = require('crypto')
const {hashSync, compareSync} = require('bcryptjs')
const {accountVerificationEmail} = require('./accountVerificationEmail')
const validator = require('../schemas/user')
const jwt = require('jsonwebtoken')
const AFTER_VERIFICATION_URL = 'https://amazing-e.herokuapp.com/'

function serverError(err, res) {
    console.error(err)
    return res.status(500).end()
}

function comesFromRegistration(from) {
    return from === 'form'
}

const authController = {
    signUp: async (req, res) => {
        /**
         * Get the user info from post request
         */
        let {
            name, photo, email, pass, role, from
        } = req.body

        try {
            /**
             * First, we need check that user info is valid
             * If not, request will be finished without going into the next step
             */
            await validator.validateAsync(req.body, {
                abortEarly: false
            })

            /**
             * Try to find the user by the email from request
             */
            let user = await User.findOne({
                email
            })

            /**
             * Hash the password from request
             */
            pass = hashSync(pass, 10)

            /**
             * If user exists is because has been registered before
             */
            if (user) {
                if (user.from.includes(from)) {
                    return res.status(400).json({
                        message: "user already exists", success: false
                    })
                }

                user.from.push(from)
                user.verified = true
                user.pass.push(pass)
                await user.save()

                return res.status(201).json({
                    message: "user signed up from " + from, success: true
                })
            }

            const code = randomBytes(15).toString('hex')

            if (comesFromRegistration(from)) {
                await accountVerificationEmail(email, code)
            }

            await User.create({
                name,
                photo,
                email,
                pass: [pass],
                role,
                from: [from],
                logged: false,
                verified: true,
                code
            })

            return res.status(201).json({
                message: "user signed up from " + from,
                success: true
            })
        } catch (error) {
            serverError(error, res)
        }
    },

    verifyMail: async (req, res) => {
        const {
            code
        } = req.params

        try {
            let {matchedCount} = await User.findOneAndUpdate({code}, {verified: true})

            if (matchedCount > 0) {
                return res.redirect(AFTER_VERIFICATION_URL)
            }

            return res.status(404).json({
                message: "user not found",
            })
        } catch (error) {
            serverError(error, res)
        }
    },

    signIn: async (req, res) => {
        const {
            pass
        } = req.body

        const {user} = req

        try {
            const checkPass = user.pass.filter(password => compareSync(pass, password))

            if (checkPass.length > 0) {
                await user.update({logged: true}).exec()

                const data = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo: user.photo
                }

                const token = jwt.sign({
                        id: user._id,
                        role: user.role
                    },
                    process.env.KEY_JWT,
                    {expiresIn: 60 * 60 * 24}
                )

                return res.status(200).json({
                    success: true, response: {
                        user: data, token: token
                    }, message: 'Welcome ' + user.name + '!'
                })
            }

            return res.status(401).json({
                success: false, message: 'Username or password incorrect'
            })
        } catch (error) {
            serverError(error, res)
        }
    },

    signInWithToken: (req, res) => {
        if (req.user) {
            return res.json({
                success: true,
                response: {
                    user: req.user
                },
                message: `Welcome ${req.user.name}`
            })
        }

        return res.status(400).json({
            success: false,
            message: "sign in please!"
        })
    },

    signOut: async (req, res) => {
        const {
            email
        } = req.user

        try {
            await User.findOneAndUpdate({email}, {logged: false})

            res.json({
                success: true,
                message: 'signed out'
            })
        } catch (error) {
            serverError(error, res)
        }
    },
}

module.exports = authController
