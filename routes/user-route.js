const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const Post = require('../model/post-schema.js')
const User = require('../model/user-schema.js');


router.post('/create-user', async (req, res) => {

    const {username, firstname, lastname , password, usernameID, email} = req.body;

    const isUsernameIDAvail = await User.exists({ usernameID })

    if (isUsernameIDAvail) {

        res.json({message: `${usernameID} already taken`});
        res.end();
        return;

    } else {
        const hash = await bcrypt.hash(password, 15);

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
                const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1minute'});

                await User.findByIdAndUpdate(user._id, {refreshToken: token});
        }
    }
    res.status(201).json({message: `User ${username} successfully created!`})
    res.end();
                    
});

router.post('/login', async (req, res) => {

    const {usernameID, password} = req.body;


    try {

        // check for user in database
        const user = await User.findOne({usernameID});
        
        // if user is not in the database throw an error
        if (!user) {
            throw Error('UsernameID not registered!');
        }

        //if user is available
        if (user) {

            // check if password is true.
            const doPasswordsMatch = await bcrypt.compare(password, user.password);

            // if password is correct
            if (doPasswordsMatch) {
                // create new token
                const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn: '1day'});
                
                // find user in db and update refresh token;
                const userID = user._id;
                await User.findByIdAndUpdate(userID, {refreshToken: token});

                res.status(200).json({message: 'User successfully logged in'});
            }
            
            // if password is incorrect
            if (!doPasswordsMatch) {
                throw Error('Password Incorrect!');
            }

        }

    } catch (error) {
        
        console.log(error.message);
        
        res.status(400).json({message: error.message})
    }
    res.end();
    
})

router.get('/logout', async (req, res) => {

    //grabs the token from bearer authorization
    const refreshToken = req.headers.authorization.split(' ')[1];
    
    try {

        //removes the token from db but does not invalidate it.
        await User.findOneAndUpdate({refreshToken}, {refreshToken: ''})

    } catch (error) {
        res.json({message: error})
    }
    res.end();
})


module.exports = router;