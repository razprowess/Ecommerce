const mongoose = require('mongoose');
const schema = mongoose.Schema;
cartSchema = new schema({
    userid: "string",
    productname: "String",
    productprice: "number"
})

var cartModel = mongoose.model('cartproduct', cartSchema);
module.exports = cartModel;