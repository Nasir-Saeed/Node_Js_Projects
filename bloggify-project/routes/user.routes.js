const express = require("express");
const User = require("../models/user.models");


const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render("signin")
})

router.get('/signup', (req, res) => {
    return res.render("signup")
})

router.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect("/")
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password)


        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password"
        });
    }

})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

module.exports = router