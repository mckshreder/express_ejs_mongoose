/*
  if we are to use a User model, we have to build one first, and that means requiring our user.js file(which builds a user, which is exported,
  and so is assigned to 'var User' below)
*/
var User = require('../models/user.js');

/*
  what we export below is a function, which we will call in
  our app.js file to actually seed the database
*/
exports.seedUsers = function seedUsers() {
    /*
      passing 'find({})' an empty object will cause it to match
      any user, and so in this case find all Users. If it doesn't find
      and users( the collection has a length of 0), we proceed to
      seed a couple users
    */
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({ email: 'test@test.com', name: 'sfsd0745sf34fewf43frf' })
            User.create({ email: 'test2@test.com', name: 'jokhjp8hlk7t7glkeqr23'});
        }
    });
};