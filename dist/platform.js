'use strict';

var cors = require('cors');
var express = require('express');
var csurf = require('csurf');
var viewConfig = require('./lib/setup/views');
var util = require('util');

function configurePlatform() {
  var platform = express();
  platform.disable('x-powered-by');
  platform.set('trust proxy', 1);
  platform.use(cors());
  viewConfig(platform, 'inverse');
  platform.use(csurf({ cookie: true }));

  var authenticate = require('./lib/authenticate');
  platform.use('/platform', function (req, res, next) {
    res.locals._csrfToken = req.csrfToken();
    res.locals.user = { user: req.user };
    next();
  });
  platform.use('/platform', authenticate, require('./routes/platform/index'));
  platform.use('/platform', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // error handler
  platform.use('/platform', function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    // res.status(err.status || 500)
    // res.render('error')
    res.redirect('/error');
  });

  return platform;
}

module.exports = configurePlatform;
//# sourceMappingURL=platform.js.map