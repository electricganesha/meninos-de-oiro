var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

require('./models/News');
require('./models/StructuralInfo');
require('./models/Categories');
require('./models/Stories');
require('./models/Partners');
require('./models/Team');
require('./models/Projects');
require('./models/Stats');
require('./models/Members');
mongoose.connect('mongodb://localhost/meninos-de-oiro')

require('./config/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var port = process.env.PORT || 3003

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//required for passport
app.use(session({ secret: 'meninosdeoiro' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err);
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

app.listen(port,function()
{
    console.log('Listening on port' + port);
});

module.exports = app;
