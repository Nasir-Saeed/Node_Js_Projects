const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = 8001

// Middleware
const { checkForAuthentication, restrictTo } = require("./middleware/userauth.middleware")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


// MongoDB
const { connectMongdb } = require("./connection")
const URL = require("./model/url.model")

connectMongdb("mongodb://localhost:27017/short-url-app")
    .then(() => {
        console.log("MongoDB Connected Successfully")
    })
    .catch(() => {
        console.log("MongoDB Not Connected")
    })


// Routes
const urlRoutes = require("./routes/url.router")
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user.route")



app.use("/", staticRoute)
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes)
app.use("/user", userRoute)

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    )

    if (entry) {
        res.redirect(entry.redirectURL);
    } else {
        res.json("URL Not Found")
    }
});


app.listen(PORT, () => {
    console.log(`Server Running at Port ${PORT}`)
})
