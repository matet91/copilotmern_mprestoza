//init mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define the schema for our cms model with the following properties name, email, address, contact
var cmsSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: String
});

// create the model for cms and expose it to our app
module.exports = mongoose.model('Cms', cmsSchema);
