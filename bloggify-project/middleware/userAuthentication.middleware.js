const { validateTokenForUser } = require("../services/user.services.auth");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayLoad = validateTokenForUser(tokenCookieValue)
            req.user = userPayLoad;

        } catch (error) { }
        return next();
    }
}


module.exports = {
    checkForAuthenticationCookie
}