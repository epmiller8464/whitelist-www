'use strict'
const passport = require('passport')
const moment = require('moment')
module.exports = (req, res, next) => {

  function hasCookie (req) {
    let authenticated = false
    if (req && req.cookies) {
      authenticated = req.cookies['su_user']
      if (!authenticated) {
        authenticated = req.signedCookies['su_user']
      }
    }
    return authenticated
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    // if the login cookie is not expried proceed
    if (hasCookie(req)) {
      return next()
    }

    if (!user) {
      // return res.status(404).json({error: 'Unauthorized'})
      return next(new Error('Unauthorized'))
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      res.cookie('su_user', Date.now(), {
        httpOnly: true,
        maxAge: moment().add(24, 'hours').unix(),
        signed: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
      })
      next()
    })
  })(req, res, next)
}
