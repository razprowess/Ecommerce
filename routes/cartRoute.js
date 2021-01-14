const express = require('express');
const router = express.Router();
const productModel = require('../model/productSchema');
const cartModel = require("../model/cartSchema");

router.post('/addtocart', async (req, res) => {
    let productID = req.body.prdID;
    let response = await productModel.find({ '_id': productID });
    console.log(response);
    let user_id = response[0].userID;
    let productname = response[0].name;
    let productprice = response[0].price;

    var data = await cartModel.create({ 'productname': productname,
                "userid": user_id, "productprice": productprice })
    if (data) {
        res.json({
            "code": 1,
            "message": "product added to cart successfuly"
        })
    } else {
        console.log('cart failed');
    }
})

router.get('/', async (req, res) => {
var data = await cartModel.find({})

let totalPrice =0;

for(var i=0; i < data.length; i++) {
    currentCartData = data[i]
    var currentPrice = currentCartData.productprice;
    totalPrice = currentPrice + totalPrice;
}

console.log(data);

res.render('cart', {"response": data, "total": totalPrice})

//delete cart item
router.post('/deleteCartItem', async (req, res) => {
    var cartItemID = req.body.cartItemId;
var response = await cartModel.deleteOne({'_id': cartItemID})
if(response){
    res.json({
        code: 1,
        message: "content delete"
    })
}
})

})

module.exports = router;