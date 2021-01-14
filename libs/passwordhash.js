var passwordhash = {}

var bcrypt = require("bcrypt");
passwordhash.saltRounds = 10;

passwordhash.hash = async function(data, salt = 10){
     return await bcrypt.hash(data, salt)
};

passwordhash.verify = async function(data, hash){
    return await bcrypt.compare(data, hash)
}

module.exports = passwordhash;

