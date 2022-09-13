const mongoose = require('mongoose')

const schema = new mongoose.Schema ({
    name: {type:String, required:true},
    photo: {type:String, required:true},
    email: {type:String, required:true},
    pass: [{type:String, required:true}], //TIENE QUE que ser un array para que pueda alojar TODAS LAS CONTRASEÑAS
    role: {type:String, required:true}, //como usuario comun vamos a tener que asignarle el rol "user" y hay que ver la forma de crear administradores de otra forma
    from: [{type:String, required:true}], //array con todas las formas en las que se registró el usuario
    logged: {type:Boolean, required:true}, //por defecto como el usuario no está logueado va a estar definido como false y cuando el usuario se loguea => true
    verified: {type:Boolean, required:true}, //por defecto como el usuario no está verificado va a estar definido como false y cuando el usuario verifique su cuenta => true
    code: {type:String, required:true} //codigo de verificacion del usuario que "se enviará" por mail
})

const User = mongoose.model('users',schema)
module.exports = User