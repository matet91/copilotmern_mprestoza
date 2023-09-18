require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
//init path
const path = require('path');
const dbconn = require('./config/dbConfig');
const mongoose = require('mongoose');
const cors = require('cors');
//init cors options
const corsOptions = require('./config/corsOptions');
//import cms route
const cmsRoute = require('./routes/cms');

//call db connection function
dbconn();

//use cors
app.use(cors(corsOptions));

//create a middleware for static files like css with specific path
app.use('/', express.json());
app.use('/cms', cmsRoute);

//create route all for 404 status
app.all('*', (req, res) => {
    res.status(404);
    //create condition for request.accepts
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error: 'Not found' });
    } else {
        res.type('txt').send('Not found');
    }
}); 

//create mongoose open connection
mongoose.connection.once('open', () => {
    console.log('MongoDB connection is open');
    //create a listener
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});

//create mongoose error connection
mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
});