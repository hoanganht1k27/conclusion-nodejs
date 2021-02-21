const express = require('express')
const logger = require('morgan')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.send("ahihi")
})

app.listen(process.env.PORT || 3000)