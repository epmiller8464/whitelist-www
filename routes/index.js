'use strict'
const express = require('express')
const router = express.Router()
const authenticate = require('../lib/authenticate')
const {check, validationResult, query} = require('express-validator/check')
const {matchedData, sanitize, sanitizeQuery} = require('express-validator/filter')
const {Subscriber, User} = require('../lib/model')
const {Email} = require('../lib/mail')
const {verifyToken} = require('../lib/jsonwebtoken')
const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()]
const org = require('../lib/data/team')
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Swytch',
    VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
    WP_URL: process.env.WHITEPAPER_URL,
    team: org.team,
    advisors: org.advisors,
    csrfToken: req.csrfToken()
  })
})

router.get('/login', function (req, res, next) {
  req.logOut()
  req.user = null
  req.session = null
  res.locals = null
  res.clearCookie('SU_USER')
  res.render('login', {
    title: 'Swytch',
    hideLogin: true,
    csrfToken: req.csrfToken()
  })
})

router.post('/logout', function (req, res, next) {
  req.logOut()
  req.user = null
  req.session = null
  res.locals = null
  res.clearCookie('SU_USER')
  res.redirect('/')
})

router.get('/sign-up', function (req, res, next) {

  res.render('sign-up', {
    title: 'Swytch',
    hideSignup: true,
    csrfToken: req.csrfToken()
  })
})

router.get('/verify/:id', function (req, res, next) {
  var token = req.query.token

  verifyToken(token)
  .then((result) => {
    // TODO: blacklist the token
    User.findOneAndUpdate({_id: result.sub}, {verified: true}, function (err, user) {
      if (err || !user) {
        return next(new Error('We couldn\'t process your request at this time.'))
      }

      if (user) {
        res.redirect('/platform/token-sale')
      }
    })
  }).catch((err) => {
    return next(err)
  })
})

router.get('/error', (req, res, next) => {
  res.render('error', {message: 'Noting to see here'})
})

module.exports = router
