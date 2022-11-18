const mongoose = require('mongoose');

const connectDB = () => {

    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;