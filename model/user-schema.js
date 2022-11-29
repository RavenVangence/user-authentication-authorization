const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
})


// // Login method 

// userSchema.statics.login = async function ({usernameID, password}) {
    
//     const user = await this.findOne({usernameID});

//     if (!user) {
//         throw Error('UsernameID not found!');
//     }

//     if (user) {

//         // Compare given password to hashed password in database
//         bcrypt.compare(password , user.password, function (error , res) {
            
//             if (res === true)   { // If passwords match

//                 jwt.sign( {user}, process.env.JWT_PRIVATE_KEY, function (err, token) {

//                     this.refreshToken = token;

//                     if (err) {
//                         return err;
//                     }
//                     return {user};
//                 });
//             }

//             else {          // If passwords do not match
//                 console.log(2);
//                 throw Error('Password incorrect!')
//             }
//         }); 
//     }
// }


module.exports = mongoose.model('User', userSchema)