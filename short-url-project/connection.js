const mongoose = require("mongoose")

async function connectMongdb(url) {
    return mongoose.connect(url)
}

module.exports = { connectMongdb }