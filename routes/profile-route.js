const express = require('express');
const authorizeToken = require('../controllers/authorize-token');
const User = require('../model/user-schema.js');
const router = express.Router();

router.get('/:userObjectID', authorizeToken, async (req, res) => {

    const {userObjectID} = req.params;
    
    try {
        const user = await User.findOne({userObjectID});
        const {username, usernameID, roles} = user;
        res.status(200).json({username, usernameID, roles});

    } catch (error) {
        res.status(400).json({message: error.message})
    }
    res.end();
})

module.exports = router;