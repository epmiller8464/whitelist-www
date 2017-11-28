'use strict'
const express = require('express')
const router = express.Router()
const authenticate = require('../../lib/authenticate')
const {check, validationResult, query} = require('express-validator/check')
const {matchedData, sanitize, sanitizeQuery} = require('express-validator/filter')
const {Subscriber, User} = require('../../lib/model')
const {Email} = require('../../lib/mail')
const {verifyToken} = require('../../lib/jsonwebtoken')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('platform', {
    title: 'Swytch Platform',
    // layout: 'inverse'
    // site_key: process.env.RECAPTCHA_KEY,
    // VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
    // WP_URL: process.env.WHITEPAPER_URL,
    // csrfToken: req.csrfToken()
  })
})
// Every validator method in the validator lib is available as a
// method in the check() APIs.
// You can customize per validator messages with .withMessage()

// Every sanitizer method in the validator lib is available as well!
// ...or throw your own errors using validators created with .custom()

// confirm_url: buildUrl(`verify/:id?token=${token}`),

// router.post('/login', authenticate, function (req, res, next) {
//   res.render('login', {
//     title: 'Swytch',
//     site_key: process.env.RECAPTCHA_KEY,
//     csrfToken: req.csrfToken()
//   })
// })

// router.get('/verify/:id', function (req, res, next) {
//
//   res.render('index', {
//     title: 'Swytch',
//     site_key: process.env.RECAPTCHA_KEY,
//     csrfToken: req.csrfToken()
//   })
// })

router.get('/verify/:id', function (req, res, next) {

  var token = req.query.token

  verifyToken(token)
  .then((result) => {
    var updates = {verified: true}

    /// TODO: blacklist the token
    User.findByIdAndUpdate(req.params.id, updates, function (e, u) {
      res.redirect(`/?verified=true&login=true`)

    })
  }).catch((err) => {
    return next(err)
  })
})

module.exports = router