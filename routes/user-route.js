const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user-schema.js');


router.post('/create-user', async (req, res) => {
    //data deconstruction
    const {username, firstname, lastname , password, usernameID, email} = req.body;
    
    try {
        //check if usernameID provided is already taken 
        const isUsernameIDAvail = await User.exists({ usernameID })
        //if usernameID is already taken
        if (isUsernameIDAvail) {
            throw new Error(`@usernameID already taken`);
        }

        //await to hash password
        const hash = await bcrypt.hash(password, 15);
        //create and store user in db
        const user = await User.create(
            { 
                username,
                password: hash, 
                firstname, 
                lastname,
                usernameID,
                email,
            });
        const userID = user.usernameID;
        if (user) {
            //sign token
            const token =  jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn: '2h'});
            //send cookie encased token to front-end
            res.cookie('auth_token', token, {maxAge: 1000 * 60 * 60 * 2});
            res.cookie('SESSION_CREATE_ID', userID);
            res.status(201).json({message: `User ${username} successfully created!`, userID})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    res.end();
});

router.post('/login', async (req, res) => {
    //data desconstruction
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
                const userID = user.usernameID;

                // create new token
                const token = jwt.sign({user}, process.env.JWT_PRIVATE_KEY, {expiresIn: '2h'});
                res.cookie('auth_token', token, {maxAge: 1000 * 60 * 60 * 2});
                res.cookie('SESSION_LOGIN_ID', userID);
                res.status(200).json({message: 'User successfully logged in', userID});
            }
            
            // if password is incorrect
            if (!doPasswordsMatch) {
                throw new Error('Password Incorrect!');
            }

        }

    } catch (error) {
        //send back error response tp front-end

        res.status(400).json({error: error.message})
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
        res.status(400).json({error: error.message})
    }
    res.end();
})


module.exports = router;