const express = require('express')
const { route } = require('.')
const router = express.Router()
const theloaiModel = require('../models/theloai')

function validateInput(s) {
    return (s != null && s != '')
}

router.get('/', async (req, res) => {
    let allTheloai = await theloaiModel.find({}).map((theloai) => {
        return theloai
    })
    res.json(allTheloai)
})

router.get('/nhap', (req, res) => {
    res.render('theloai/nhap.ejs')
})

router.post('/nhap', async (req, res) => {
    let name = req.body.name
    if(validateInput(name)) {
        try {
            let theloai = new theloaiModel({
                name: name
            })
            let result = await theloai.save()
            res.send(result)
        } catch (err) {
            res.send("Co loi khi nhap the loai")
        }
    } else {
        res.send("Ten the loai khong hop le")
    }
})

router.get('/sua', (req, res) => {
    res.render('theloai/sua.ejs')
})

router.post('/sua', async (req, res) => {
    let {nameCu, nameMoi} = req.body
    if(validateInput(nameCu) && validateInput(nameMoi)) {
        try {
            let result = await theloaiModel.updateOne({name: nameCu}, {name: nameMoi})
            res.send(result)
        } catch (err) {
            res.send("Co loi khi sua the loai")
        }
    } else {
        res.send("Ten the loai khong hop le")
    }
})

router.get('/xoa', (req, res) => {
    res.render('theloai/xoa')
})

router.post('/xoa', async (req, res) => {
    let name = req.body.name
    if(validateInput(name)) {
        try {
            let result = await theloaiModel.deleteOne({name: name})
            res.send(result)
        } catch (err) {
            res.send('Co loi khi xoa')
        }
    } else {
        res.send("Ten the loai can xoa khong hop le")
    }
})

module.exports = router