const express = require('express');
const router = express.Router();
const Posts = require('../model/post-schema.js')
const User = require('../model/user-schema.js')
const authorizeToken = require('../controllers/authorize-token.js');

router.get('/my-posts', authorizeToken, async (req, res) => {
    const {user} = req.user;

    const userPost = await User.findById({_id: user._id}).populate('posts');
    if (userPost) {
        res.json(userPost);
    } else {
        res.json({message: 'User has not yet posted'})
        console.log(user);
    }
    
    res.end();
})

router.post('/create-post', authorizeToken, async (req, res) => {
    const {user} = req.user;
    const {message} = req.body;

    if(!message) {

        res.json({message: 'message cannot be empty'});
        res.end();
    }

    try {
        
        const post = await Posts.create({message, author: user._id});
        
        await User.findByIdAndUpdate({_id: user._id}, {$push: { posts: post._id }})

        await Posts.findOne({ _id: post._id });


        res.json({message: 'post successfully created'})
    } catch (error) {
        console.log(error);
    }
    res.end();
})
module.exports = router;