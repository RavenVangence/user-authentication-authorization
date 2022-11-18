const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username : {
        type: String,
        required : true
    },
    firstname : {
        type: String,
        required : true
    },
    lastname : {
        type: String,
        required : true
    },
    usernameID : {
        type: String,
        required: true
    },
    roles : {
        user: {
            type: Boolean,
            default: true
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)