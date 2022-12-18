const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const postSchema = Schema({
    message: {
        type: String
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Post', postSchema);