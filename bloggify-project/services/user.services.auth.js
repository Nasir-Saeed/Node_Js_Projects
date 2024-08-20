const JWT = require("jsonwebtoken")
const secretKeys = ""


function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    const token = JWT.sign(payload, secretKeys)
    return token;
}

function validateTokenForUser(token) {
    const payload = JWT.verify(token, secretKeys)
    return payload
}

module.exports = {
    createTokenForUser,
    validateTokenForUser
}

