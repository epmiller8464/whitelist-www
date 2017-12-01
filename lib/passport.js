'use strict'
const LocalStrategy = require('passport-local').Strategy
const {User} = require('./model')

module.exports = (passport) => {
  let localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd',
    passReqToCallback: true
  }, function (req, username, password, done) {
    if (req.isAuthenticated()) {
      return done(null, req.user)
    }

    User.findOne({email: username}, function (err, user) {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(new Error('Incorrect username.'), false, {message: 'Incorrect username.'})
      }

      user.comparePassword(password, (err, matches) => {
        if (err || !matches) {
          return done(new Error('Incorrect password.'), false, {message: 'Incorrect password.'})
        }
        req.session.regenerate(function (err) {
          // will have a new session here
          return done(null, user.toObject())
        })
      })
    })
  })

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user.toObject())
    })
  })
  passport.use(localStrategy)
}
