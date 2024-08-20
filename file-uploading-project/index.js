const express = require('express')
const multer = require('multer')
const path = require("path")


const PORT = 8000;
const app = express()

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueID = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueID + '-' + file.originalname)
    },
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    return res.render("home")
})

app.post('/upload', upload.single('profileImage'), function (req, res) {
    console.log(req.file)
    return res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Server Running at PORT ${PORT}`)
})