const {connect} = require('mongoose')

/**
 * Options for mongoose
 * @type {{useUnifiedTopology: boolean, useNewUrlParser: boolean}}
 */
const options = {
    /**
     * @see {https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology}
     */
    useUnifiedTopology: true,

    /**
     * @see {https://mongoosejs.com/docs/5.x/docs/deprecations.html#the-usenewurlparser-option}
     */
    useNewUrlParser: true,
}

/**
 * @see {https://mongoosejs.com/docs/connections.html}
 *
 * Connect to Mongo DB instance using URI provided in .env file
 * This method returns  Promise but does nothing when connected
 * Only when error occurs will call the catch callback function
 */
connect(process.env.MONGO_URI, options)
    .catch(error => {
        console.log('Error: ', error)
        process.exit(1)
    })
