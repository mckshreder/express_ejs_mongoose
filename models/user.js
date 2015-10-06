//-------------------------------
// USER MODEL FOR PART 2 MD "USER AUTHENTICATION"
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('../node_modules/bcrypt'));

var userSchema = mongoose.Schema({
    email: String,
    password: String
});

userSchema.pre('save',function (next){
   var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

   return bcrypt.genSaltAsync(10).then(function(result) {

        return bcrypt.hashAsync(user.password, result).then(function(hash){
            console.log("hash: " + hash);
            user.password = hash;
            next();
        });
   })
});

userSchema.methods.comparePasswordAsync = function(candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;

// /*
//   we must first require mongoose so we have a handle
//   to an object we can reuse
// */
// var mongoose = require('mongoose');
// // var Schema = mongoose.Schema;
// /*
//    we use the mongoose 'Schema' method to
//    build a schema that will define our user
//    model
// */
// var userSchema = mongoose.Schema({
//     email: String,
//     name: String
// });
// /*
//   here we explicitly create the 'User' model using our
//   schema, we then must export it, so when user.js is
//   required elsewhere, it provides a User model
// */
// var User = mongoose.model('User', userSchema);
// module.exports = User;