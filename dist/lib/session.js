'use strict';

var expressSession = require('express-session');

var session = function session(app) {
  var sess = {
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(expressSession(sess));
};

module.exports = session;
//# sourceMappingURL=session.js.map