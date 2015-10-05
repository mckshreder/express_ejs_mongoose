/*
  we must first require mongoose so we have a handle
  to an object we can reuse
*/
var mongoose = require('mongoose');

/*
   we use the mongoose 'Schema' method to
   build a schema that will define our user
   model
*/
var userSchema = mongoose.Schema({
    email: String,
    hashed_password: String

});

/*
  here we explicitly create the 'User' model using our
  schema, we then must export it, so when user.js is
  required elsewhere, it provides a User model
*/
var User = mongoose.model('User', userSchema);
module.exports = User;