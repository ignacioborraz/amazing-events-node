const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    /**
     * TIENE QUE que ser un array para que pueda alojar TODAS LAS CONTRASEÑAS historicas
     */
    pass: [{
        type: String,
        required: true
    }],

    /**
     * como usuario comun vamos a tener que asignarle el rol "user"
     * hay que ver la forma de crear administradores de otra forma
     */
    role: {
        type: String,
        required: true
    },

    /**
     * array con todas las formas en las que se registró el usuario
     */
    from: [{
        type: String,
        required: true
    }],

    /**
     * por defecto como el usuario no está logueado va a estar definido como false
     * y cuando el usuario se loguea cambia a true
     */
    logged: {
        type: Boolean,
        required: true
    },

    /**
     * por defecto como el usuario no está verificado va a estar definido como false
     * cuando el usuario verifique su cuenta cambia a true
     */
    verified: {
        type: Boolean,
        required: true
    },

    /**
     * codigo de verificacion del usuario que "se enviará" por mail
     */
    code: {
        type: String,
        required: true
    }

})

const User = mongoose.model('users', schema)

module.exports = User