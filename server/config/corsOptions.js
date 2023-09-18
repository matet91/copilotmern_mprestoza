//require allowed origins
const allowedOrigins = require('./allowedOrigins');

//create cors options
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        //create condition for origin
        if (allowedOrigins.indexOf(origin) !== -1 || origin === undefined || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
    //add credentials and status
    , credentials: true
    , optionsSuccessStatus: 200
};

//export
module.exports = corsOptions;