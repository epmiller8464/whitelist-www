'use strict'
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator/check')
const {sanitize} = require('express-validator/filter')
const {Subscriber} = require('../lib/model')
const {Email} = require('../lib/mail')
/* GET home page. */

const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim().normalizeEmail()]

router.post('/newsletter/join', validate, function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()})
  }
  Subscriber.create({email: req.body.email, subscribedTo: ['news-letter']}, (err, doc) => {
    if (err) {
      return res.status(200).json({success: false, message: 'Your e-mail is already subscribed.'})
    }
    Email.sendNewsletterWelcomeEmail({to: req.body.email})
    .then((result) => {
      res.status(200).json({success: true})
    }).catch((err) => {
      res.status(200).json({success: false})
    })
  })
})
module.exports = router
