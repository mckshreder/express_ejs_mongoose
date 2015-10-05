//add this line in with the other includes at the top of
//the file
'use strict';

module.exports = require('./node_modules/express/lib/express');
var express = require('express');
var app = express();
var routes  = require( './routes' );
var dbConfig = require('./db/credentials.js');
var mongoose = require('mongoose');

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
// app.get('/', function(req, res) {
//     res.render('pages/index.ejs');
// });



//use db connection sting based on whether the environment is development or production
switch(app.get('env')){
    case 'development':
        mongoose.connect(dbConfig.mongo.dev.conn, dbConfig.mongo.options);
        break;
    case 'production':
        mongoose.connect(dbConfig.mongo.prod.conn, dbConfig.mongo.options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}
//seed a couple of users if none exist
require('./db/seed.js').seedUsers();

//render our home index route
app.get( '/', routes.index );

app.listen(8080);
console.log('server starting...go to localhost:8080');