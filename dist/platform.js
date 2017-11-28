'use strict';

var cors = require('cors');
var express = require('express');
var exphbs = require('./handlebars')('inverse');
var path = require('path');
var csurf = require('csurf');

function configurePlatform() {
  var platform = express();
  platform.disable('x-powered-by');
  platform.set('trust proxy', 1);
  platform.use(cors());
  // alternate view engine
  platform.engine('hbs', exphbs.engine);
  platform.set('views', path.join(__dirname, 'views'));
  platform.set('view engine', 'hbs');
  platform.use(csurf({ cookie: true }));

  var authenticate = require('./lib/authenticate');
  var index = require('./routes/platform/index');
  platform.use('/platform', function (req, res, next) {
    res.locals._csrfToken = req.csrfToken();
    res.locals.user = { user: req.user };
    next();
  });
  platform.use('/platform', index);

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
    res.status(err.status || 500);
    res.render('error');
  });

  return platform;
}

module.exports = configurePlatform;
//# sourceMappingURL=platform.js.map