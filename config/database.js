const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
.then(()=>console.log('connected to database successfully'))
.catch(error=>console.log(error))