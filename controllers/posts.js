var express = require('express');
var postsController = express.Router();
var Post = require('../models/post.js');
var User = require('../models/user.js');

//define get posts route
postsController.get('/',function(req,res) {

    User.findOne({email: req.session.email})
        .then(function (user) {
            Post.find({ _creator: user._id })
                .execAsync()
                .then(function(posts){
                    console.log("posts: "+  posts);
                    res.render('pages/posts/index.ejs',{
                        curr_user:user,
                        posts:posts
                    });
                });
        })
        .catch(function (err) {
            console.log(err);
        });
});

//define create new post route
postsController.post('/create', function ( req, res ) {

    User.findOne({email: req.session.email})
        .then(function (user) {

            user.saveAsync().then(function () {

                var post = new Post({
                    title: req.body.title,
                    body: req.body.body,
                    _creator: user.id
                });

                post.saveAsync().then(function () {
                    res.redirect(303, '/posts');
                });
        })
        .catch(function (err) {
            console.log(err);
        });
    });
});

module.exports = postsController;