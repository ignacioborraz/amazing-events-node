const User = require('../models/User')
const crypto = require('crypto') //recurso propio de nodeJS para generar códigos aleatorios y unicos
const bcryptjs = require('bcryptjs') //recurso propio de nodeJS para hashear contraseñas
const sendMail = require('./sendMail')
const Joi = require('joi')

const validator = Joi.object({
    "name": Joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'NAME_REQUIRED',
            'string.empty': 'NAME_REQUIRED',
            'string.min': 'NAME_TOO_SHORT',
            'string.max': 'NAME_TOO_LARGE',
        }),
    "photo": Joi.string()
        .required()
        .uri()
        .messages({
            'any.required': 'PHOTO_REQUIRED',
            'string.empty': 'PHOTO_REQUIRED',
            'string.uri': 'INVALID_URL'
        }),
    "email": Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
        .messages({
            'any.required': 'EMAIL_REQUIRED',
            'string.empty': 'EMAIL_REQUIRED',
            'string.email': 'INVALID_EMAIL'
        }),
    "pass": Joi.string()
        .required()
        .min(8)
        .max(50)
        .alphanum()
        .messages({
            'any.required': 'PASS_REQUIRED',
            'string.empty': 'PASS_REQUIRED',
            'string.min': 'PASS_TOO_SHORT',
            'string.max': 'PASS_TOO_LARGE',
            'string.alphanum': 'PASS_ALPHANUMERIC_REQUIRED',
        }),
    "role": Joi.any()
        .required()
        .valid('user', 'admin')
        .messages({
            'any.required': 'ROLE_REQUIRED',
            'string.empty': 'ROLE_REQUIRED',
            'any.only': 'ROLE_NOT_ALLOWED'
        }),
    "from": Joi.string()
        .required()
        .messages({
            'any.required': 'FROM_REQUIRED',
            'string.empty': 'FROM_REQUIRED'
        }),
})

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
            })
        }
    },

    signUp: async (req, res) => {
        let {
            name,
            photo,
            email,
            pass,
            role, //el rol tiene que venir desde el frontend para usar este metodo para ambos casos (user y admin)
            from //el from tiene que venir desde el frontend para avisarle al método desde donde se crea el usuario
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
                let code = crypto //invoco el generador de codigos
                    .randomBytes(15) //le aplico el método para avisarle que tiene que tener 15 digitos
                    .toString('hex') //le aplico el método para avisarle que tiene que ser hexagecimal
                //code: clave unica de usuario o unique string
                if (from === 'form') { //si la data viene del formulario de registro
                    pass = bcryptjs.hashSync(pass, 10) //utilizamos el método hashSync que requiere dos parametros
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
                    }).save() //modifico pass con el array
                    sendMail(email, code)
                    res.status(201).json({
                        message: "user signed up from form",
                        success: true
                    })
                } else { //si viene desde redes sociales (cualquier red social)
                    pass = bcryptjs.hashSync(pass, 10) //utilizamos el método hashSync que requiere dos parametros
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
                    //no hace falta enviar el mail de verificacion
                    res.status(201).json({
                        message: "user signed up from " + from,
                        success: true
                    })
                }
            } else { //si el usuario SI existe
                if (user.from.includes(from)) { //si la propiedad from del usuario (que es un array) incluye el valor de from ===> user.from = ['google','facebook'] incluye from='google'
                    res.status(200).json({ //200 a confirmar/estudiar => tiene exito buscando un usuario
                        message: "user already exists",
                        success: false //porque no tiene exito en la creacion del usuario
                    })
                } else { // ===> user.from = ['google','facebook'] incluye from='linkedin'
                    user.from.push(from) //vinculo la nueva forma de registro al usuario encontrado pusheando el from adentro del array
                    // ===> user.from = ['google','facebook','linkedin']
                    user.verified = true //si el usuario ya tiene registro previos, significa que ya se verificó en algún momento
                    //si ya se verificó en algún momento ==> me aseguro que esté verificado definiendo user.verified=true
                    pass = bcryptjs.hashSync(pass, 10) //hasheo la nueva contraseña del usuario
                    user.pass.push(pass) //y la pusheo al array de contraseñas
                    await user.save() //finalizo guardando los cambios del usuario
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

    //el codigo unico y aleatorio generado en el metodo de signup
    //se pasa por params a este otro metodo para poder verificar la cuenta
    //luego de requerirlo lo comparo con los perfiles ya creados (lo busco en la base de datos)
    //si encuentra el usuario cambio el verified de false a true
    //si no lo encuentra avisar que el mail a verificar no tiene cuenta
    verifyMail: async (req, res) => {
        const {
            code
        } = req.params
        //let user = await User.findOne({code:code})
        try {
            let user = await User.findOne({
                code
            })
            if (user) {
                user.verified = true //cambio la propiedad
                await user.save() //guardo el cambio en la base de datos
                res.redirect('https://www.google.com') //aqui se coloca el link de redireccionamiento
                //puede redireccionar hacia index/login o hacia una pagina nueva de bienvenida al usuario nuevo
                //NO OLVIDAR HOSTEAR EL FRONT PARA QUE FUNCIONE EL REDIRECCIONAMIENTO
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
            pass,
            from
        } = req.body
        try {
            const user = await User.findOne({
                email
            })
            if (!user) { // Si usuario no existe
                res.status(404).json({
                    success: false,
                    message: "User doesn't exists, please sign up"
                })
            } else if (user.verified) { // Si usuario existe y esta verificado
                const checkPass = user.pass.filter(password => bcryptjs.compareSync(pass, password))
                if (from === 'form') { // Si el usuario intenta ingresar por FORM
                    if (checkPass.length > 0) { // Si contraseña coincide
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        }
                        user.logged = true
                        await user.save()
                        res.status(200).json({
                            success: true,
                            response: {
                                user: loginUser
                            },
                            message: 'Welcome ' + user.name
                        })
                    } else { // Si contraseña no coincide
                        res.status(400).json({
                            success: false,
                            message: 'Username or password incorrect'
                        })
                    }
                } else { // Si el usuario intenta ingresar por RRSS
                    if (checkPass.length > 0) { // Si contraseña coincide
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        }
                        user.logged = true
                        await user.save()
                        res.status(200).json({
                            success: true,
                            response: {
                                user: loginUser
                            },
                            message: 'Welcome ' + user.name
                        })
                    } else { // Si contraseña no coincide
                        res.status(400).json({
                            success: false,
                            message: 'Invalid credentials'
                        })
                    }
                }
            } else { // Si usuario existe pero NO esta verificado
                res.status(401).json({
                    success: false,
                    message: 'Please, verify your email account and try again'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Sign In ERROR, try again later'
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