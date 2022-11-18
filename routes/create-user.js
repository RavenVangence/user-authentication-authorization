const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user-schema.js');


router.post('/create-user', async (req, res) => {

    const {username, firstname, lastname , password, usernameID} = req.body;
    const isUsernameIDAvail = await User.exists({ usernameID })

    if (isUsernameIDAvail) {
        res.json({message: `${usernameID} already taken`})
        res.end
        return;
    } else {
        bcrypt.hash(password, 15, (err, hash) => {
            User.create({ 
                            username,
                            password: hash, 
                            firstname, 
                            lastname,
                            usernameID,
                        }, function (err, ) {

                if (err) return handleError(err);
                // saved!
                });
            res.status(201).json({message: `User ${username} successfully created!`})
            res.end
        })
    }
})


module.exports = router;