'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var requestHeaders = require('./lib/requestHeaders');
var sslRedirect = require('./lib/ssl-redirect');
var passport = require('passport');
var compression = require('compression');
var session = require('./lib/setup/session');
var viewConfig = require('./lib/setup/views');
var app = express();
app.use(compression());
app.use(sslRedirect(['test', 'production']));
requestHeaders(app);
app.disable('x-powered-by');
// view engine setup
viewConfig(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.set('secret', process.env.APP_SECRET);
require('./lib/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

session(app);

app.use(cookieParser(process.env.APP_SECRET));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

require('./routes')(app);
require('./lib/db')(function () {});
require('./lib/events')();

module.exports = app;
//# sourceMappingURL=app.js.map