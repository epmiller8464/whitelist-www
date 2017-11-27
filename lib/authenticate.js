'use strict'
const passport = require('passport')

module.exports = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(400).json({error: 'Unauthorized'})
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      next()
    })
  })(req, res, next)
}
