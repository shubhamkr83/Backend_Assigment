require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
try {
    connection.once('open', function () {
        console.log('Database Connected...✨✨✨✨');
    })
} catch (error) {
    connection.on('error', function (error) {
        console.log(error);
    });
}

// Passport config
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)
// use express router
app.get((req, res) => {
    res.status(404).render('errors/404')
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})