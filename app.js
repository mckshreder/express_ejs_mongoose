//add this line in with the other includes at the top of
//the file
'use strict'

require('dotenv').load();

module.exports = require('./node_modules/express/lib/express');
var express = require('express');
var app = express();
var routes  = require( './controllers' );
var usersController = require('./controllers/users.js');
var dbConfig = require('./db/credentials.js');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var credentials = require('./config/credentials.js');
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use( require('cookie-parser')( credentials.cookieSecret)); 
app.use( require('express-session')({ resave: false, saveUninitialized: false, secret: credentials.cookieSecret }));

//include body parser
app.use( require('./node_modules/body-parser').urlencoded({ extended: true }));

app.use(require('./controllers'));
//app.use('/', usersController);
//app.use('/posts', postsController);

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
// app.get( '/', routes.index );

app.listen(8080);
console.log('server starting...go to localhost:8080');