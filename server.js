const express = require('express')
const logger = require('morgan')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const indexRouter = require('./routes/index')
const theloaiRouter = require('./routes/theloai')
const sanphamRouter = require('./routes/sanpham')

const dbString = 'mongodb://localhost:27017/conclusion-nodejs'
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbString, dbOptions)
const db = mongoose.connection
db.once('open', () => {
    console.log("Connected")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', indexRouter)
app.use('/theloai', theloaiRouter)
app.use('/sanpham', sanphamRouter)

app.listen(process.env.PORT || 3000)