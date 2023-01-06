const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next) => {
    
    const {auth_token} = req.cookies;
    if(!auth_token) {
        return res.sendStatus(401);
    }
    jwt.verify(auth_token, process.env.JWT_PRIVATE_KEY, (error, user) => {
        if(error) {
            return res.sendStatus(400);
        }
        req.user = user;
        next();
    });
}


module.exports = authorizeToken;