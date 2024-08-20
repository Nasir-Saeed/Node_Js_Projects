const express = require("express")
const { handleGenerateNewShortUrl, handleGetAnalyticsShortUrl } = require("../controller/url.controller")

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)
router.get('/analytics/:shortId', handleGetAnalyticsShortUrl)

module.exports = router