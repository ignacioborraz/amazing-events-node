const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,GOOGLE_USER} = process.env

const sendMail = async(mail,code) => {

    const client = new OAuth2(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.GOOGLE_URL
    )

    client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH
    })

    const accessToken = client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: { //transport layer security
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })

    const mailOptions = {
        from: GOOGLE_USER,
        to: mail,
        subject: 'verify amazing events account',
        html: `
            <div>
                <h1>Hola ${mail}</h1>
                <a href='http://localhost:8000/auth/verify/${code}'>click to verify!</a>
            </div>
        ` //codigo HTML puro que se va a renderizar en el cuerpo del mail
        //en el cuerpo del html tengo que enviar un link hacia una direccion que verifique la clave unica de verificacion
        //ese link o endpoint es la que se conectará con el método correspondiente para la verificacion de la cuenta
        //NO OLVIDAR HOSTEAR EL BACK PARA QUE FUNCIONE EL LINK DEL ANCHOR
        //LOCALHOST SE TIENE QUE CAMBIAR POR LA URL HOSTEADA DE BACK
    }

    await transport.sendMail(mailOptions, (error,response)=>{
        if(error) {
            console.log(error)
        } else {
            console.log('ok')
        }
    })

}

module.exports = sendMail