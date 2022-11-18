const User = require('../models/User')
const {randomBytes} = require('crypto')
const {hashSync, compareSync} = require('bcryptjs')
const {accountVerificationEmail} = require('./accountVerificationEmail')
const {validator: userValidator} = require('../schemas/user')
const jwt = require('jsonwebtoken')
const AFTER_VERIFICATION_URL = 'https://amazing-e.herokuapp.com/'
const {
    userSignedUpResponse, userExistsResponse, userNotFoundResponse, userSignedOutResponse,
    mustSignInResponse, invalidCredentialsResponse,
} = require('../responses/auth')

function serverError(err, res) {
    console.error(err)
    return res.status(500).end()
}

function comesFromRegistration(from) {
    return from === 'form'
}

async function signUpVerifiedUser(user, req) {
    let {from, pass} = req

    if (user.from.includes(from)) {
        return userExistsResponse()
    }

    await user.update({
        verified: true,
        $addToSet: {from, pass}
    })

    return userSignedUpResponse()
}

async function signUpNewUser(req) {
    let {
        name, photo, email, pass, role, from
    } = req.body

    pass = hashSync(pass, 10)

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

    return userSignedUpResponse()
}

const authController = {
    signUp: async (req, res) => {
        /**
         * Get the user email from post request
         */
        let {email} = req.body

        try {
            /**
             * First, we need check that user info is valid
             * If not, request will be finished without going into the next step
             */
            await userValidator.validateAsync(req.body, {
                abortEarly: false
            })

            /**
             * Try to find the user by the email from request
             */
            let user = await User.findByEmail(email)

            /**
             * If user exists is because has been registered before, just sign in
             * Otherwise creates new user first and then sign up
             */
            return (user ? await signUpVerifiedUser(user, res) : await signUpNewUser(req))
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

            return userNotFoundResponse()
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

                const token = jwt.sign({
                        id: user._id,
                        role: user.role
                    },
                    process.env.KEY_JWT,
                    {expiresIn: 60 * 60 * 24}
                )

                return res.status(200).json({
                    success: true,
                    message: 'Welcome ' + user.name + '!',
                    response: {
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        },
                    },
                })
            }

            return invalidCredentialsResponse()
        } catch (error) {
            serverError(error, res)
        }
    },

    signInWithToken: (req, res) => {
        let {user} = req

        return res.json({
            success: true,
            response: {user},
            message: `Welcome ${user.name}`
        })
    },

    signOut: async (req, res) => {
        const {email} = req.user

        try {
            await User.findOneAndUpdate({email}, {logged: false})

            return userSignedOutResponse()
        } catch (error) {
            serverError(error, res)
        }
    },
}

module.exports = authController
