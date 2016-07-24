/**
 * Created by argho on 23.07.2016.
 */
var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var logger            = require('morgan');
var cookieParser      = require('cookie-parser');
var bodyParser        = require('body-parser');
var mongoose          = require('mongoose');

var env = process.env.NODE_ENV || 'development';

require('./models/Contact');
require('./models/Message');
require('./models/Chat');

var config = require('./config/' + env);

mongoose.connect(config.database);

var routes = require('./routes/index');

var app = express();

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');


app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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

    });
}

module.exports = app;