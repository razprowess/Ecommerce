const express = require("express");
const app = express();

//allow the filepath object to be accesible in all pages
app.locals = {
    filepath:"http://localhost:5000/"
}

// app.locals({
//     filepath:"http://localhost:4500/"
// });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var propertylib = require('./libs/propertylib');
var jwtoken = require('./libs/jwttoken');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//route for account
const accountRoute = require('./routes/accountRoute');
app.use('/account', accountRoute);

//route for product
const productRoute = require('./routes/productRoute');
const productModel = require('./model/productSchema');

app.use('/product', productRoute);

//route for product
const propertyRoute = require('./routes/propertyRoute');
const propertyModel = require("./model/propertySchema");
const { response } = require("express");
app.use('/properties', propertyRoute);

//route for cart
const cartRoute = require('./routes/cartRoute');
app.use('/cart', cartRoute);


app.get('/', async (req, res) => {
var response = await productModel.find({})
    res.render('dashboard', {"response": response});
})

app.get('/signup', (req, res) => {

    res.render('signup', { errmsg: req.query.message || "" })
})

app.get('/login', (req, res) => {
    res.render('home')
})

// app.get('/view', async (req, res) => {
//     var token = req.cookies['token'];
//     data = jwtoken.decode(token);
//     var userID = data.userID
//     try {
//         var response = await propertyModel.find({ userID: userID.trim() }).exec();
//         res.render('viewing', { "response": response })
//     } catch (e) {
//         throw console.error(e);
//     }

// });

app.post('/deleteprd', async (req, res) => {
var productID = req.body.prodID;
var response = await productModel.deleteOne({'_id': productID})
if(response){
    res.json(
        {"code":1, "message": "product deleted successfully!"}
    )
}
})

// app.post('/addtocart', async (req, res) => {
// let productID = req.body.prdID;
// let response = await productModel.find({'_id': productID});
// console.log(response);
// let productname = response[0].name;
// let productprice = response[0].price;

// var data = await cartModel.create({'productname': productname, "productprice": productprice })
// if(data){
//     res.json( {
//         "code":1,
//         "message": "product added to cart successfuly"
//     })
// } else{
//     console.log('cart failed');
// }
// })

const port = process.env.port || 5000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// app.get('/view', async (req, res) => {
//     let userID = req.query.userid;
//     console.log({userID});
//     try{
//         var response = await propertyModel.find({userID:userID.trim() }).exec();
// console.log({response});
//         res.render('viewing', {"response": response})
//     } catch(e){
//         throw console.error(e);    
//     }

// })

