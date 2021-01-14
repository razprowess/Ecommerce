const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var accountSchema = new Schema({
    firstname: 'string',
    username: 'string',
    email:'string',
    password:'string',
    confirmpassword: 'string',
    phone: {type:String, required:false}

})

var accountModel = mongoose.model('account', accountSchema)

module.exports = accountModel