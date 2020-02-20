const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                //bad token
                res.status(401).json({ message: 'Invalid Token' })
            }
            else {
                req.decodedToken = decodedToken
                next();
            }
        })
    }
    else {
        res.status(400).json({ message: "Token Required" })
    }
}