/*
  again, since we are need a User model, we must
  require the file that defines it
*/
var User = require('../models/user.js');

/*
  we are again exporting a function
*/
exports.index = function ( req, res ) {

    /*
      here is where the tricky bit lies, we run a User.find function,
      again passing the empty object {} so that we find all users. The
      'exec' piece executes asynchronously, which is why we pass it a
      function(err, users)...

      make sense?? probably not. When the exec function completes, ONLY THEN,
      does the res.render part kick in. That means essentially that res.render waits
      for the database find operation to complete( so we have users of course), and
      then returns the index.ejs view, along with the users object, which contains
      all those users we found(2 to be exact)
    */
    User.find({}).exec(function (err, users) {
        res.render('pages/index.ejs', {
            users: users
        });

    });
};