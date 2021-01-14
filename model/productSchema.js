const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var shoeSchema = new Schema ({
    name: 'string',
    price: 'number',
    description: 'string',
    photo:'string',
    userID: 'string'
})

const productModel = mongoose.model("shoedata", shoeSchema);

module.exports = productModel;
