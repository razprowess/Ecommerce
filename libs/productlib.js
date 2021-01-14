
var fs = require('fs'); 
var path = require('path'); 
var jwt = require('./jwttoken');
var productModel = require('../model/productSchema')
const multer = require('multer');


var productlib = {}

productlib.create = async (req) => {
    var name = req.body.shoe;
    var price = req.body.price;
    var description = req.body.description;
    var photo = req.file.filename;

    let token = req.cookies['token'];
    let decoded = jwt.decode(token);
    
    // var filepath = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
    var product=  { "name": name, "price": price,"description": description, 
                    "photo": photo, "userID": decoded.userID};

    // var obj = { 
 
    //     photo: { 
    //         data: filepath, 
    //         contentType: 'image/png'
    //     } 
    // } 

    // { "name": shoeName, "price": shoeprice,
    //              "description": description, "upload":photo })

    var data = await productModel.create(product);

    if (data) {
        return {
            code: 1,
            message: "product added successfully",
            response: data
        }
    } else {
        return {
            code: 0,
            message: "error occured",

        }
    }

}

module.exports = productlib;
