const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user-schema.js');


router.post('/create-user', async (req, res) => {

    const {username, firstname, lastname , password, usernameID, email} = req.body;

    const isUsernameIDAvail = await User.exists({ usernameID })

    if (isUsernameIDAvail) {

        res.json({message: `${usernameID} already taken`});
        res.end();
        return;

    } else {
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create(
            { 
                username,
                password: hash, 
                firstname, 
                lastname,
                usernameID,
                email,
            });         
        if (user) {
                const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY);

                await User.findByIdAndUpdate(user._id, {refreshToken: token});
        }
    }
    res.status(201).json({message: `User ${username} successfully created!`})
    res.end();
                    
});

router.post('/login', async (req, res) => {

    const {usernameID, password} = req.body;

    try {
        const user = await User.login({usernameID, password});

        res.status(200).json({message: 'User successfully logged in', user});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message})
    }
    res.end();
})


module.exports = router;