
const express = require('express');
const jwtoken = require('../libs/jwttoken');

const router = express.Router()

var propertylib = require('../libs/propertylib');
const propertyModel = require('../model/propertySchema');
const { decode } = require('../libs/jwttoken');

router.post('/', async (req, res) => {

    var response = await propertylib.create(req)
    
    if(response.code == 1){
        res.redirect("/properties")
    }else{
     console.log(response.message);   
    }
})

router.get('/', async (req, res) => {

    var token = req.cookies['token'];
    var decoded = jwtoken.decode(token);

    var data = await propertyModel.find({"_id" : decoded.userID});

   res.render('properties', {"data": decoded.userID});

})


module.exports = router