require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db-connect.js');
//ROUTES
const userRoute = require('./routes/create-user.js');

//APP DOT USE CASES
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);

try {
    connectDB();
    mongoose.connection.once('open', () => {
        console.log('connected to DB');
        app.listen(process.env.PORT || 8000, console.log('listerning on port', 8000));
    })
} catch (error) {
    console.error(error);
}
