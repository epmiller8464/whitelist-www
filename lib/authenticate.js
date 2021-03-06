'use strict'
const passport = require('passport')
const moment = require('moment')
const {User} = require('./model/index')
module.exports = (req, res, next) => {

  function hasCookie (req) {
    let authenticated = ''
    if (req && req.cookies) {
      authenticated = req.cookies['SU_USER']
      if (!authenticated) {
        authenticated = req.signedCookies['SU_USER']
      }
    }
    return authenticated
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }

    // if the login cookie is not expried proceed
    if (req.user && hasCookie(req)) {
      return next()
    }

    if (!user && !hasCookie(req)) {
      return res.redirect('/login')
    }

    if (!user) {
      user = {_id: hasCookie(req)}
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      // 1 hour expiration
      if (!hasCookie(req)) {
        let expires = ((60 * 60 * 24) * 1000)
        res.cookie('SU_USER', req.user._id, {
          httpOnly: true,
          expires: new Date(Date.now() + expires),
          signed: true,
          secure: process.env.NODE_ENV !== 'development',
          path: '/'
        })
      }
      next()
    })
  })(req, res, next)
}
