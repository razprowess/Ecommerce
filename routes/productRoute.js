const express = require('express');
const jwtoken = require('../libs/jwttoken');
const router = express.Router();
var productlib = require('../libs/productlib');
var multer = require('multer');
const productModel = require('../model/productSchema');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("maybe writing");
        console.log(file.originalname);
        cb(null, __dirname + '/../public/uploads')
    },
    filename: (req, file, cb) => {
        // console.log(file.filename);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });


// var upload = multer({dest: __dirname + '/uploads/images'});

router.get('/add', (req, res) => {
    res.render('addshoes');
})

router.post('/upload', upload.single('photo'), async (req, res) => {
    var response = await productlib.create(req);
    if (response.code = 1) {
        res.redirect('/product/add');
    }
})

router.get('/show', async(req, res) => {

    var token = req.cookies['token'];
    var decoded = jwtoken.decode(token);

    var data = await productModel.find({'userID': decoded.userID })

    res.render('show', {"response":data});
})
module.exports = router