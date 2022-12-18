const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, user) => {
        if(error) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


module.exports = authorizeToken;