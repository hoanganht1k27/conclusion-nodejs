const express = require('express')
const router = express.Router()

const sanphamModel = require('../../models/sanpham')
const theloaiModel = require('../../models/theloai')

router.get('/', (req, res) => {
    res.send("Hello sp query")
})

router.get('/:name', async (req, res) => {
    try {
        let name = req.params.name
        let result = await sanphamModel.findOne({name: name})
        res.json(result)
    } catch (err) {
        res.send("Co loi")
    }
})

router.get('/soluong/sorted', async (req, res) => {
    try {
        let result = await sanphamModel.find({}).sort({soluong: 1, gia: -1}).select('name soluong gia')
        let kq = result.map(sp => {
            return {
                name: sp.name,
                soluong: sp.soluong,
                gia: sp.gia
            }
        })
        res.send(kq)
    } catch (err) {
        console.log(err)
        res.send("Co loi")
    }
})

router.get('/gia/sorted', async (req, res) => {
    try {
        let result = await sanphamModel.find({}).sort({gia: 1, soluong: -1}).select('name soluong gia')
        let kq = result.map(sp => {
            return {
                name: sp.name,
                soluong: sp.soluong,
                gia: sp.gia
            }
        })
        res.send(kq)
    } catch (err) {
        console.log(err)
        res.send("Co loi")
    }
})

router.get('/ngaynhap/sorted', async (req, res) => {
    try {
        let result = await sanphamModel.find({}).sort({ngaynhap: 1}).skip(4).select('name soluong gia ngaynhap').limit(3)
        let kq = result.map(sp => {
            return {
                name: sp.name,
                soluong: sp.soluong,
                gia: sp.gia,
                ngaynhap: sp.ngaynhap
            }
        })
        res.send(kq)
    } catch (err) {
        console.log(err)
        res.send("Co loi")
    }
})

router.get('/theloai/:name', async (req, res) => {
    try {
        let name = req.params.name
        let theloaiId = await theloaiModel.findOne({name: name})
        theloaiId = theloaiId._id
        let result = await sanphamModel.find({theloai: {$in: [theloaiId]}}).select("name theloai")
        res.send(result)
    } catch (err) {
        res.send("Co loi")
    }
})

module.exports = router