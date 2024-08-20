require('dotenv').config()

const express = require("express")
const path = require("path")
const userRoute = require("./routes/user.routes");
const blogRoute = require("./routes/blog.routes");
const connectionMongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/userAuthentication.middleware");
const Blog = require("./models/blog.models");
const User = require('./models/user.models');


connectionMongoDB(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected Successfully")
    }).catch(() => {
        console.log("MongoDB Not Connected")
    })

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve('./public')));

app.use(checkForAuthenticationCookie("token"))

app.set("view engine", 'ejs');
app.set('views', path.resolve("./views"));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,

    })
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => {
    console.log(`Server Listening At PORT ${PORT}`)
})