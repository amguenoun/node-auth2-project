const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '60'
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}
