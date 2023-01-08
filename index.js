require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const connectDB = require('./config/db-connect.js');
//ROUTES
const userRoute = require('./routes/user-route.js');
const postRoute = require('./routes/post-route.js');
const profileRoute = require('./routes/profile-route.js');
//APP DOT USE CASES
app.use(express.json());
app.use(cors({
    origin: 'https://raven-auth-api.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cookieParser());
app.use('/user', userRoute);
app.use('/user/post-api', postRoute);
app.use('/profile', profileRoute);

try {
    connectDB();
    mongoose.connection.once('open', () => {
        console.log('connected to DB');
        app.listen(process.env.PORT, console.log('listerning on port',process.env.PORT));
    })
} catch (error) {
    console.error(error);
}
