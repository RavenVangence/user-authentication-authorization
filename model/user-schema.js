const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username : {
        type: String,
        required : [true, 'Username required']
    },
    firstname : {
        type: String,
        required : [true, 'Firstname required']
    },
    lastname : {
        type: String,
        required : [true, 'Lastname required']
    },
    usernameID : {
        type: String,
        required: [true,'UsernameID required'],
        unique: [true, 'UsernameID already registered!']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already registered!']
    },
    roles : {
        user: {
            type: Boolean,
            default: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        moderator: {
            type: Boolean,
            default: false
        }
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('User', userSchema)