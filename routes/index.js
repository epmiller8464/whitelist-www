'use strict'
const express = require('express')
const router = express.Router()
const authenticate = require('../lib/authenticate')
const {check, validationResult, query} = require('express-validator/check')
const {matchedData, sanitize, sanitizeQuery} = require('express-validator/filter')
const {Subscriber} = require('../lib/model')
const {Email} = require('../lib/mail')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
    WP_URL: process.env.WHITEPAPER_URL,
    csrfToken: req.csrfToken()
  })
})
// Every validator method in the validator lib is available as a
// method in the check() APIs.
// You can customize per validator messages with .withMessage()

// Every sanitizer method in the validator lib is available as well!
// ...or throw your own errors using validators created with .custom()



// confirm_url: buildUrl(`verify/:id?token=${token}`),

router.post('/login', authenticate, function (req, res, next) {
  res.render('login', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

router.post('/signup', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

router.get('/signup/confirmation', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

module.exports = router