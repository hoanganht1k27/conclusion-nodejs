const express = require('express')
const router = express.Router()
const fs = require('fs')
const { type } = require('os')
const multer = require('multer')
const path = require('path')
// const upload = multer({dest: path.join('models', 'fileProcessing')})

const imageTypes = ["image/jpeg", "image/png", "image/gif"]
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join('models', 'fileProcessing'))
    },
    filename: (req, file, callback) => {
        console.log(file.size)
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if(imageTypes.includes(file.mimetype))
        {
            console.log(file)
            callback(null, true)
        }
        else callback(new Error('Type khong hop le'), false)
    },
    limits: {fileSize: 3 * 1024 * 1024} //3MB
})

router.get('/', (req, res) => {
    fs.readFile('models/fileProcessing/file.txt', 'utf8', (err, data) => {     
        let cc = data.split('\n')
        return res.send(`So dong la ${cc.length}`)
    })
})

router.get('/read/:name', (req, res) => {
    let name = req.params.name
    fs.readFile('models/fileProcessing/' + name, 'utf8', (err, data) => {
        if(err) res.send(err)
        else res.send(data)
    })
})

router.get('/create/:name', (req, res) => {
    let name = req.params.name
    fs.writeFile('models/fileProcessing/' + name, "Hello world", (err) => {
        if(err) res.send(err)
        else res.send("File created")
    })
})

router.get('/write/:name', (req, res) => {
    let name = req.params.name
    fs.writeFile('models/fileProcessing/' + name, 'Hello content!', (err, data) => {
        if(err) res.send(err)
        else res.redirect('/file/')
    })
})

router.get('/appendFile/:name', (req, res) => {
    let name = req.params.name
    fs.appendFile('models/fileProcessing/' + name, '\nHolle cc cc ccc ', (err) => {
        if(err) res.send(err)
        else res.redirect('/file/read/' + name)
    })
})

router.get('/deleteFile/:name', (req, res) => {
    let name = req.params.name
    fs.unlink('models/fileProcessing/' + name, (err) => {
        if(err) res.send(err)
        else res.send("File deleted")
    })
})

router.get('/upload', (req, res) => {
    res.render('fileProcessing/upload.ejs')
})

router.post('/upload', upload.single('file'), errorCheckMiddleware, (req, res) => {
    res.send("Uploaded")
})

function errorCheckMiddleware(err, req, res, next) {
    if(err) {
        res.send(err.message)
    } else {
        next()
    }
}

module.exports = router