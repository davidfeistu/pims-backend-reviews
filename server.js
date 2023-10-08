const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = require('./app')

dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


const db = mongoose.connection;
db.on('open', () => {
    console.log("Connected to database")
})


app.listen(process.env.PORT, () => {
    console.log(`App is running`)
})



