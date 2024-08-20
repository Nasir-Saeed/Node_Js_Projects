const express = require("express")
const { connectMongoDB } = require("./connection")
const mongoose = require("mongoose")
const userRouter = require("./routes/user.routes")
const { logRequest } = require("./middleware/user.middleware")


const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: false }))
connectMongoDB("your-mongodb-database-url")
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch(() => {
        console.log("MongoDB  Not Connected")
    })

app.use(logRequest("log.txt"))
app.use("/api/users", userRouter)

app.listen(PORT, () => {
    console.log(`Port Successfully Runing at ${PORT}`)
})