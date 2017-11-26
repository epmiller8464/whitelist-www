'use strict';

var LocalStrategy = require('passport-local').Strategy;

var _require = require('./model'),
    User = _require.User;

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'pwd' }, function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user.toObject());
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
//# sourceMappingURL=passport.js.map