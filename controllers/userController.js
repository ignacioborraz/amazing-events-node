/* 
- logica del metodo de registro de usuario (de formulario O red social)
    - consultar si el mail existe en la base de datos
    - si el mail no existe => ejemplo ===> from: []
        - si el usuario se crea con un formulario
        - si el usuario se crea con redes sociales 
    - si el mail existe => ejemplo ===> from: ['google']
        - si el usuario ya tiene cuenta por este medio (existe adentro del array de from) no permito el re-registro
            ejemplo => el usuario quiere registrarse por google pero ya hizo previamente el registro con google
            from: ['google'] y NO tengo que agregar google de nuevo, es decir no permito ==> form: ['google','google']
        - si el usuario no tiene cuenta por este medio (no existe adentro del array de from) permito su registro
            ejemplo => el usuario quiere registrarse por facebook pero ya hizo previamente el registro con google
            from: ['google'] y SI tengo que agregar un nuevo "from", es decir ==> form: ['google','facebook']

            from y pass deben ser arrays: por que?
            from : ['formulario']    ===> pass = 'Hola1234' (hasheado)
            from : ['formulario','google']   ===> pass = 'chau12345U' (hasheado)
            si reemplazo la contraseña del formulario por la nueva de google
            cuando el usuario quiera volver a ingresar con el formulario NO VA A PODER
            por eso la contraseña tambien tiene que ser un array
            from : ['formulario']    ===> pass = ['Hola1234'] (hasheado)
            from : ['formulario','google']   ===> pass = ['Hola1234','chau12345U'] (hasheado)
            from : ['formulario','google','facebook']   ===> pass = ['Hola1234','chau12345U','igna2022'] (hasheado)
            from : ['formulario','google','facebook','github']   ===> pass = ['Hola1234','chau12345U','igna2022','mindy2000'] (hasheado)
            MODIFICO EL MODELO!!!
*/

const User = require('../models/User')
const crypto = require('crypto') //recurso propio de nodeJS para generar códigos aleatorios y unicos
const bcryptjs = require('bcryptjs') //recurso propio de nodeJS para hashear contraseñas
const sendMail = require('./sendMail')

const userController = {

    signUp: async(req,res) => {
        let {
            name,
            photo,
            email,
            pass,
            role, //el rol tiene que venir desde el frontend para usar este metodo para ambos casos (user y admin)
            from //el from tiene que venir desde el frontend para avisarle al método desde donde se crea el usuario
        } = req.body
        try {
            let user = await User.findOne({email})
            if (!user) {
                let logged = false
                let verified = false
                let code = crypto //invoco el generador de codigos
                    .randomBytes(15) //le aplico el método para avisarle que tiene que tener 15 digitos
                    .toString('hex') //le aplico el método para avisarle que tiene que ser hexagecimal
                //code: clave unica de usuario o unique string
                if (from==='form') {//si la data viene del formulario de registro
                    pass = bcryptjs.hashSync(pass,10) //utilizamos el método hashSync que requiere dos parametros
                    user = await new User({name,photo,email,pass:[pass],role,from:[from],logged,verified,code}).save() //modifico pass con el array
                    sendMail(email,code)
                    res.status(201).json({
                        message: "user signed up from form",
                        success: true
                    })
                } else { //si viene desde redes sociales (cualquier red social)
                    pass = bcryptjs.hashSync(pass,10) //utilizamos el método hashSync que requiere dos parametros
                    verified = true
                    user = await new User({name,photo,email,pass:[pass],role,from:[from],logged,verified,code}).save()
                    //no hace falta enviar el mail de verificacion
                    res.status(201).json({
                        message: "user signed up from "+from,
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
                    pass = bcryptjs.hashSync(pass,10) //hasheo la nueva contraseña del usuario
                    user.pass.push(pass) //y la pusheo al array de contraseñas
                    await user.save() //finalizo guardando los cambios del usuario
                    res.status(201).json({
                        message: "user signed up from "+from,
                        success: true
                    })
                }
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: "could't signed up",
                success: false
            })
        }
    },

    verifyMail: async() => {},
    
    signIn: async() => {},

    signOut: async() => {} //findOneAndUpdate y cambiar logged de true a false

}

module.exports = userController