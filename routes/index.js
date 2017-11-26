'use strict'
const express = require('express')
const router = express.Router()
const authenticate = require('../lib/authenticate')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

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