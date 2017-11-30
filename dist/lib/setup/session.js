'use strict';

var expressSession = require('express-session');
var uuid = require('uuid');
module.exports = function (app) {
  var sess = {
    genid: function genid(req) {
      return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true
  };
  // app.use(session({
  //   secret: process.env.APP_SECRET,
  //   resave: false,
  //   saveUninitialized: true
  // }))
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(expressSession(sess));
};
//# sourceMappingURL=session.js.map