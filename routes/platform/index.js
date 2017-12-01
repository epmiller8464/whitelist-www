'use strict'
const express = require('express')
const router = express.Router()
// const authenticate = require('../../lib/authenticate')
const {check} = require('express-validator/check')
const {sanitize} = require('express-validator/filter')
const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()]
const nets = require('nets')
const notifier = require('../../lib/notifier')
const {confirmEmailToken, verifyToken} = require('../../lib/jsonwebtoken')
const {Email} = require('../../lib/mail')

const {Whitelist, User} = require('../../lib/model/index')

router.get('/', function (req, res, next) {
  return res.redirect('/platform/token-sale')
})

router.get('/token-sale', function (req, res, next) {

  let step = 'verify-email'
  if (req.user.verified) {
    step = 'whitelist'
  }
  if (req.user.verified && req.user.whitelisted) {
    step = 'complete'
  }

  let countries = require('../../lib/countries')()
  let user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    verified: req.user.verified,
    whitelisted: req.user.whitelisted,
    id: req.user._id
  }
  res.render('platform/token_sale', {
    title: 'Swytch Pre-Sale Whitelist Registration',
    user: user,
    countries: countries,
    step: step,
    contributionAmounts: loadContributionAmounts(),
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})
router.post('/token-sale', function (req, res, next) {

  var body = {response: req.body['g-recaptcha-response'], remoteip: req.ip}

  if (!body.response) {
    return res.status(400).json({error: true, message: 'Invalid parameters'})
  }

  validateSubmitter(body.response, body.remoteip, function (err, result) {
    if (err || !result.success) {
      return res.status(400).json({error: true, message: 'Validation failed.'})
    }
    let whitelist = new Whitelist({
      ip: req.ip,
      country_code: req.body.country_code,
      crypto_type: req.body.crypto_type,
      purchase_amount: req.body.purchase_amount,
      timezone: req.body.timezone,
      us_citizen: req.body.us_citizen,
      can_participate: !req.body.us_citizen,
      owner_id: req.user._id,
      verified: true
    })
    whitelist.save((err) => {

      User.findOneAndUpdate({_id: req.user._id}, {whitelisted: true}, {new: true}, (error, doc) => {

        req.user = req.session.me = doc.toObject()
        return res.status(200).json({success: true})
      })
    })
  })
})
router.get('/resend/verify-email', (req, res, next) => {

  let id = req.query.id

  if (id !== req.user._id.toString()) {
    return next(new Error('Unauthorized'))
  }

  confirmEmailToken(id)
  .then((token) => {
    Email.sendConfirmation({
      id: id,
      to: req.user.email,
      name: `${req.user.first_name} ${req.user.last_name}`,
      token: token
    })
    .then((result) => {

      res.redirect('/platform/token-sale')
    }).catch((e) => {
      return next(new Error('We couldn\'t process your request at this time.'))
    })
  }).catch((err) => {
    return next(new Error('We couldn\'t process your request at this time.'))
  })
})

function validateSubmitter (recaptcha, ip, cb) {
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret= ' + process.env.RECAPTCHA_SECRET + '&response=' + recaptcha + '&remoteip=' + ip
  var request = {
    url: url,
    method: 'POST',
    encoding: undefined
  }
  nets(request, function (err, res, body) {
    return cb(err, JSON.parse(body))
  })
}

function loadContributionAmounts () {
  return [
    {value: '0-100', display: 'USD > 100'},
    {value: '100-1000', display: 'USD 100 - 1,000'},
    {value: '1000-5000', display: 'USD 1,000 - 5,000'},
    {value: '5000-10000', display: 'USD 5,000 - 10,000'},
    {value: '10000-50000', display: 'USD 10,000 - 50,000'},
    {value: '50000-100000', display: 'USD 50,000 - 100,000'},
    {value: '100000-MAX', display: 'USD +100,000'}
  ]
}

module.exports = router
