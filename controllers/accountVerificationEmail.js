const {createTransport} = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {GOOGLE_ID, GOOGLE_REFRESH, GOOGLE_SECRET, GOOGLE_URL, GOOGLE_USER} = process.env

/**
 * Creates a new Client instance
 * @returns {OAuth2Client}
 */
function createClient() {
    return new OAuth2(
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
}

/**
 * Get email transport configured
 * @param client
 * @returns {*}
 */
function getTransport(client) {
    const accessToken = client.getAccessToken()

    return createTransport({
        service: 'gmail',

        auth: {
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },

        /**
         * Transport Layer Security
         */
        tls: {
            rejectUnauthorized: false
        }
    })
}

/**
 * Generate a piece of HTML to be sent
 * @param mail
 * @param host
 * @param code
 * @returns {string}
 */
function getEmailBody({mail, host, code}) {
    return `
        <div>
            <h1>Hola, ${mail}</h1>
            
            <a href="${host}/auth/verify/${code}">
                Verify my account.
            </a>
        </div>
    `
}

/**
 * Send email to given address with a verification code
 * @param mail
 * @param code
 * @returns {Promise<void>}
 */
const accountVerificationEmail = async (mail, code) => {
    const client = createClient()

    client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH
    })

    const transport = getTransport(client)

    const mailOptions = {
        /**
         * Set the Google User as sender
         */
        from: GOOGLE_USER,

        /**
         * Who receives the email
         */
        to: mail,

        /**
         * Text for email subject
         */
        subject: 'Verify your new account in Amazing Events',

        /**
         * Pure HTML to be rendered in email body
         * It sends a link to perform account verification
         * The url refers to the real url where the app is hosted
         */
        html: getEmailBody({
            mail,
            code,
            host: "http://localhost:8000",
        })
    }

    await transport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error(error)
            return
        }

        console.log('Email sent!')
    })
}

module.exports = accountVerificationEmail
