
var accountlib = {}

const accountModel = require('../model/accountShema')
const passwordhash = require("./passwordhash");
const jwt = require("./jwttoken")

accountlib.create = async function (req) {
    var firstname = req.body.firstname;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;

    var isusername = await accountlib.isusernameexist(username);

    if (isusername) {
        return {
            code: 0,
            message: 'username already exist.'
        }
    }
    else if (password != confirmpassword) {
        return {
            code: 0,
            message: 'password does not match'
        }
    }
    else {
        var pass = await passwordhash.hash(password);
        accountModel.create({ "firstname": firstname, "username": username, "password": pass, "confirmpassword": confirmpassword})
        var token = jwt.sign({ "username": username })
        // var token = jwt.sign({"email":email, userid: data._id})
        return {
            code: 1,
            message: "account created successfully",
            token: token
        }
    }

}

accountlib.isusernameexist = async function (username) {

    return await accountModel.exists({ 'username': username })
}


accountlib.login = async (req) => {
    var username = req.body.username;
    var password = req.body.password;

    var isusername = await accountlib.isusername(username);

    // console.log(isusername);

    if (isusername) {
        var data = await accountModel.findOne({ "username": username })
        

        if (passwordhash.verify(password, data.password)) {
            // console.log("I can now create account");

            var token = await jwt.sign({ "userID": data._id })

            return {
                token: token,
                code: 1,
                data: data,
                message: "login this user"

            }
        } else {
            return {
                code: 0,
                message: "password not matched"
            }
        }
    } else {
        console.log("show something")
        return {
            code: 0,
            message: "email does not exist"
        }
    }
}

accountlib.isusername = async (username) => {

    return await accountModel.exists({ "username": username })
}


module.exports = accountlib