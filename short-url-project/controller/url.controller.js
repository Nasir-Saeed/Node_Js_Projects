const url = require("../model/url.model")
const shortid = require("shortid")

async function handleGenerateNewShortUrl(req, res) {
    const shortID = shortid()
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "Url is Required" })
    await url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home', {
        id: shortID,
    })
}

async function handleGetAnalyticsShortUrl(req, res) {
    const shortId = req.params.shortId
    const result = await url.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalyticsShortUrl
}