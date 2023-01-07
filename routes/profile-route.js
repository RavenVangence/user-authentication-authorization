const express = require('express');
const authorizeToken = require('../controllers/authorize-token');
const User = require('../model/user-schema.js');
const router = express.Router();

router.get('/:usernameID', authorizeToken, async (req, res) => {

    const {usernameID} = req.params;
    
    try {
        const user = await User.findOne({usernameID});
        const {username, roles} = user;
        res.status(200).json({username, usernameID, roles});

    } catch (error) {
        res.status(400).json({message: error.message})
    }
    res.end();
})

module.exports = router;