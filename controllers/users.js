var express = require('express');
var usersController = express.Router();
var User = require('../models/user.js');
// index route will display all Users
usersController.get('/', function ( req, res ) {

    User.findAsync({}).then( function(users){
           res.render('pages/index.ejs', {
            users: users
           });
    }).catch();
});
//route that will return a Register User form
usersController.get('/new', function ( req, res ) {
    res.render('pages/new.ejs');
});
usersController.post('/create', function ( req, res ) {
    
    User.createAsync({email: req.body.email, name: req.body.name}).then(function() {
        res.redirect(303,'/');
    })
    .catch(function(err){
        console.log("error:" + err);
        res.redirect(303,'/new')
    });
});
usersController.get('/show/:id',function (req,res){

    User.findByIdAsync(req.params.id).then(function(user){
           res.render('pages/show.ejs',{ user: user });
    }).catch();
});
module.exports = usersController;