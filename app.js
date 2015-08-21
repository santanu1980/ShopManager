var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection  = require('express-myconnection');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var orderRoute = require('./routes/orderRouteConfig.js');


var app = express();
routes.app = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var payment = require('./routes/payment');
app.use('/payment', payment);

app.use(
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root1234',
        port : 3306, //port mysql
        database:'chalbhaja'
    },'request')
);
/*
var connection = mysql.createConnection({
  host    : 'localhost',
  user     : 'root',
  password : 'root1234',
  database : 'chalbhaja'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n\n");
  } else {
    console.log("Error connecting database ... \n\n");
  }
});
*/
app.use('/', login);
app.use('/users', users);
app.use('/login',login);
app.use('/index', routes);
new orderRoute(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
