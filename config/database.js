require('dotenv').config()

const {connect} = require('mongoose')

connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .catch(error => {
        console.log('Error: ', error)
        process.exit(1)
    })
