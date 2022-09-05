const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO,
    {
        useUnifiedTopology: true, //habilita a mongoose a controlar la db de mongo
        useNewUrlParser: true //utiliza el analizador de errores de mongoose en lugar del del mongo
    }
    //primer parametro: link de conexion
    //segundo parametro: objeto con dos propiedades en true
)
    .then(()=>console.log('connected to database successfully')) //luego de que se cumple la promesa aviso al desarrollador que esta conectado
    .catch(error=>console.log(error)) //si no se puedo conectar: consologueo el error

//una vez configurada la conexion: requiero esta configuracion en app.js