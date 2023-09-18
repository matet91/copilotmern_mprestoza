//init mongoose
var mongoose = require('mongoose');


//create db connection in async
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI, {
            //useCreateIndex: true,
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}   

//export db connection
module.exports = connectDB;