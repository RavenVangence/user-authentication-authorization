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
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
})


// Login method 

userSchema.statics.login = async function ({usernameID, password}) {
    
    const user = await this.findOne({usernameID});

    if (user) {
        // Load hash from password DB.
        bcrypt.compare(password , hash, function(err, res) {
            if (res === true) {

                console.log( user._id ); 
                const token = jwt.sign( user, process.env.JWT_PRIVATE_KEY);
                user.refreshToken = token;
            }
            if (err) {
                
                throw Error('Passwords incorrect!')
            }
        }); 
    }
    throw Error('UsernameID not found!');
    
}


module.exports = mongoose.model('User', userSchema)