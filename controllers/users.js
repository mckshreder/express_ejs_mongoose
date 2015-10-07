var express = require('express');
var usersController = express.Router();
var User = require('../models/user.js');
// index route will display all Users
usersController.get('/', function ( req, res ) {

    if(req.session && req.session.email){

        User.findOne({ email: req.session.email }).then(function(user){
            res.render('pages/index.ejs',{
                curr_user: user.email,
                users: null
            });
        })
    }
    else{
        User.findAsync({})
            .then( function(users){
                res.render('pages/index.ejs', {
                    curr_user: null,
                    users: users
                });
            })
            .catch();
    }
});

//route that will return a Register User form
usersController.get('/new', function ( req, res ) {

    res.render('pages/new.ejs');
});

//define the create users route
usersController.post('/create', function ( req, res) {

    var user = new User({ email: req.body.email, password: req.body.password });
    user.saveAsync()
    .then(function() {
         req.session.email = user.email;
        res.redirect(303,'/');
    })
    .catch(function(err){
        console.log("error:" + err);
        res.redirect(303,'/new')
    });
});


//this will return a login page
usersController.get('/login', function ( req, res ) {
    res.render('pages/login.ejs');
});


//this route will handle logging in a user
usersController.post('/login', function ( req, res) {

    User.findOneAsync({email: req.body.email})
    .then(function(user) {

       user.comparePasswordAsync(req.body.password).then(function (isMatch) {
          req.session.email = user.email;
          res.redirect(303,'/');
       })
    });
});


usersController.get('/show/:id',function (req,res){

    User.findByIdAsync(req.params.id).then(function(user){
           res.render('pages/show.ejs',{ user: user });
    }).catch();
});
module.exports = usersController;