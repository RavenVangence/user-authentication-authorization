const jwt = require('jsonwebtoken');

const authorizeToken = (req, res, next) => {
    
    const {auth_token} = req.cookies;
    try {
        if(!auth_token) {
        throw new Error('UNAUTHORIZED! MISSING TOKEN!');
    }
    jwt.verify(auth_token, process.env.JWT_PRIVATE_KEY, (error, user) => {
        if(error) {
            throw new Error('UNAUTHORIZED! INVALID TOKEN!');
        }
        req.user = user;
        next();
    });
    } catch (error) {
        res.status(401).json({error: error.message})
    }
    
}


module.exports = authorizeToken;