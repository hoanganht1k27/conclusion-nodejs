const mongoose = require('mongoose')
const sanphamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    ngaynhap: {
        type: Date,
        required: true,
        default: new Date
    },
    soluong: {
        type: Number,
        required: true,
        default: 0
    },
    theloai: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theloai'
    }],
    gia: {
        type: Number,
        required: true,
        default: 0
    },
    dacheck: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Sanpham', sanphamSchema)