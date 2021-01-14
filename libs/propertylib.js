
var propertyModel = require('../model/propertySchema')
var jwt = require('./jwttoken');

var propertylib = {}

propertylib.create = async (req) => {
    var property = req.body.property;
    var description = req.body.description

    let token = req.cookies['token']; 
    
    var decoded = jwt.decode(token);
    
    // console.log({decoded})    
    

    var data = await propertyModel.create({"property": property, "description": description, "userID":decoded.userID})
if(data){
    return {
        code: 1,
        message: "property added to database"
    }
}else {
    return {
        code: 0,
        message: "error occur"

    }
}
}


module.exports = propertylib;