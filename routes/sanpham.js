const express = require('express')
const { route } = require('.')
const router = express.Router()
const sanphamModel = require('../models/sanpham')
const theloaiModel = require('../models/theloai')
const queryRouter = require('./sanphamQuery/sanpham')

function validateInput(s) {
    return (s != null && s != '')
}

router.get('/', (req, res) => {
    res.render('sanpham/index.ejs')
})

router.get('/nhap', (req, res) => {
    res.render('sanpham/nhap.ejs')
})

router.post('/nhap', async (req, res) => {
    let {name, ngaynhap, soluong, theloai, gia, dacheck} = req.body
    if(validateInput(name) && validateInput(ngaynhap) && validateInput(soluong) && validateInput(theloai) && validateInput(gia) && validateInput(dacheck)) {
        try {
            let allTheloai = []
            theloai.forEach(nametl => {
                allTheloai.push(
                    theloaiModel.findOne({name: nametl}).then((tl) => {
                        return tl._id
                    })
                )
            });
            let allTheloaiId = []
            await Promise.all(allTheloai).then(values => {
                allTheloaiId = values
            })
            let sanpham = new sanphamModel({
                name: name,
                ngaynhap: new Date(ngaynhap),
                soluong: soluong,
                gia: gia,
                dacheck: (dacheck == "1")
            })
            allTheloaiId.forEach((id) => {
                sanpham.theloai.push(id)
            })
            let result = await(sanpham.save())
            res.send(result)
        } catch (err) {
            console.log(err)
            res.send("Co loi")
        }
    } else {
        res.send("Thong tin nhap khong hop le")
    }
})

router.get('/sua/:name', async (req, res) => {
    try {
        let name = req.params.name
        console.log(name)
        let sp = await sanphamModel.findOne({name: name})
        // res.render('sanpham/sua.ejs', {sp: sp})
        res.json(sp)
    } catch (err) {
        res.send("Co loi")
    }
    
})

router.get('/xoa/:name', async (req, res) => {
    try {
        let name = req.params.name
        console.log(name)
        let sp = await sanphamModel.deleteOne({name: name})
        // res.render('sanpham/sua.ejs', {sp: sp})
        res.json(sp)
    } catch (err) {
        res.send("Co loi")
    }
})

router.use('/query', queryRouter)

module.exports = router