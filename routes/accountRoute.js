const express = require('express');
const accountlib = require('../libs/accountlib');
const router = express.Router()

router.post('/register', async (req, res)=> {

    var response = await accountlib.create(req);

    try {

        if (response.code == 1) {
            var token = response.token
            var expire = 2 * 24 * 60 * 60 * 1000
            res.cookie("token", token, {maxAge: expire})
            res.redirect('/properties');
            // res.redirect('/login')
            // res.render('login', { message: "account created successfully" })
            console.log('account created')
        } else if(response.code == 0){
            res.redirect('/signup?message=' + response.message)
        }
        
        else{console.log(response.message)}
    } catch (e) {
        console.log(e)
        return {
            code: 0,
            message: "error creating account",
        }
    }})

    router.post('/login', async (req, res) => {

        var response = await accountlib.login(req)
        // console.log(response.data);
        if(response.code== 1){
        var expire = 2 * 24 * 60 * 60 * 1000
        res.cookie("token", response.token, {maxAge: expire})
        
        res.redirect('/product/add');
        // res.render('properties',  {"data": response.data} )
        } else {console.log("login detail failed")}        
        })
        
    router.put('/changepassword', function () {

    })

    router.delete('/deleteAccount', () => {

    })

    module.exports = router