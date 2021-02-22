const mongoose = require('mongoose')

const theloaiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Theloai', theloaiSchema)