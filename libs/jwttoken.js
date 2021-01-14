var jwt = {}
const jwtoken = require('jsonwebtoken');
var key = require("../config.json");

jwt.sign = async function(data){
    return await jwtoken.sign(data, key.secret)
    
}

jwt.verify = async (token)=>{
    return await jwt.verify(token, config.secret);
 }
jwt.decode =  function(data){
    return  jwtoken.decode(data);
}
module.exports = jwt