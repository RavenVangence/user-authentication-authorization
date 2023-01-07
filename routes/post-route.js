const express = require('express');
const router = express.Router();
const Posts = require('../model/post-schema.js')
const User = require('../model/user-schema.js')
const authorizeToken = require('../controllers/authorize-token.js');

router.get('/my-posts', authorizeToken, async (req, res) => {
    //data deconstruction
    const {user} = req.user;

    //populating posts that the user has
    const usersPosts = await User.findById({_id: user._id}).populate('posts');
    // if user has posts, send them to front-end
    if (usersPosts) {
        res.json({posts: usersPosts.posts});
    } else {
        res.json({message: 'User has not yet posted'})
    }
    
    res.end();
})

router.post('/create-post', authorizeToken, async (req, res) => {

    //data deconstruction
    const {user} = req.user;
    const {message} = req.body;

    //if user has sent empty message
    if(!message) {
        res.json({message: 'message cannot be empty'});
        res.end();
    }

    //Try/Catch block
    try {
        
        //create and store user's post in db
        const post = await Posts.create({message, author: user._id});
        //await to push the posts id to users post array
        await User.findByIdAndUpdate({_id: user._id}, {$push: { posts: post._id }})
        //populating posts that the user has
        const usersPosts = await User.findById({_id: user._id}).populate('posts');
        //get users posts
        const posts = usersPosts.posts;
        //send back response to user
        res.json({message: 'post successfully created', posts});
    } catch (error) {
        res.sendStatus(500);
    }
    res.end();
})
module.exports = router;