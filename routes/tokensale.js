'use strict'
'use strict'
const express = require('express')
const router = express.Router()
const {authenticate} = require('../lib/authenticate')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('token-sale', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

router.get('/signup', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})

router.post('/verify-identity', function (req, res, next) {

})

module.exports = router



