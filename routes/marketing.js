'use strict'
const express = require('express')
const router = express.Router()
const {check, validationResult, query} = require('express-validator/check')
const {matchedData, sanitize, sanitizeQuery} = require('express-validator/filter')
const {Subscriber} = require('../lib/model')
const {Email} = require('../lib/mail')
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Swytch',
//     site_key: process.env.RECAPTCHA_KEY,
//     VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
//     WP_URL: process.env.WHITEPAPER_URL,
//     csrfToken: req.csrfToken()
//   })
// })

const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim().normalizeEmail()]

router.post('/newsletter/join', validate, function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  }
  Subscriber.create({email: req.body.email, subscribeTo: ['news-letter']}, (err, doc) => {
    if (err) {
      return res.status(200).json({success: false, message: 'Your e-mail is already subscribed.'})
    }
    Email.sendNewsletterWelcomeEmail({to: req.body.email})
    .then((result) => {
      res.status(200).json({success: true})
    }).catch((err) => {
      // req.log(err)
      res.status(200).json({success: false})
    })
  })
})

module.exports = router