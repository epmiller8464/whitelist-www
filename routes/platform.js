const express = require('express')
const router = express.Router()
const geoip = require('geoip-lite')
const nets = require('nets')
const moment = require('moment')
const mail = require('../lib/mail')
const {notifier} = require('../lib/notifier')

/* GET home page. */
router.get('/', csurf, function (req, res, next) {
  let contributionAmounts = loadContributionAmounts()
  res.render('index', {
    title: 'Swytch',
    contributionAmounts: contributionAmounts,
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  })
})
router.get('/geo-locate', (req, res, next) => {
  let geo = geoip.lookup(req.query.ip)
  return res.status(200).json(geo)
})

router.post('/whitelist', csurf, (req, res, next) => {

  if (hasCookie(req)) {
    return res.status(200).json({success: true})
  }

  let body = {response: req.body['g-recaptcha-response'], remoteip: req.ip}
  let email = req.body.email

  if ((!body.response || !email)) {
    return res.status(400).json({error: 'Invalid parameters'})
  }

  validateSubmitter(body.response, body.remoteip, (err, result) => {
    if (err || !result.success) {
      return res.status(400).json({error: 'Validation failed.'})
    }

    res.cookie('_wl', Date.now(), {
      httpOnly: true,
      maxAge: moment().add(90, 'days').unix(),
      signed: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/'
    })
    res.cookie('_wl_ip', req.ip, {
      httpOnly: true,
      maxAge: moment().add(90, 'days').unix(),
      signed: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/'
    })
    notifier('onboard', {
      email: req.body.email,
      ip: req.ip,
      cryptoType: req.body.cryptoType,
      purchaseAmount: req.body.purchaseAmount,
      timeZone: {
        ts: req.body.timeZone.ts,
        zoneName: req.body.timeZone.zoneName,
        offset: req.body.timeZone.offset
      },
      usCitizenAttestation: req.body.usCitizenAttestation,
      canParticipate: !req.body.usCitizenAttestation
    })
    return res.status(200).json({success: true})
    // })
  })
})

router.get('/whitelist/confirmation', (req, res, next) => {

})

function validateSubmitter (recaptcha, ip, cb) {
  let url = `https://www.google.com/recaptcha/api/siteverify?secret= ${process.env.RECAPTCHA_SECRET}&response=${recaptcha}&remoteip=${ip}`
  let request = {
    url: url,
    method: 'POST',
    encoding: undefined
  }
  nets(request, (err, res, body) => {
    return cb(err, JSON.parse(body))
  })
}

function loadContributionAmounts () {
  return [
    {value: null, display: 'USD > 100'},
    {value: '100-1000', display: 'USD 100 - 1,000'},
    {value: '1000-5000', display: 'USD 1,000 - 5,000'},
    {value: '5000-10000', display: 'USD 5,000 - 10,000'},
    {value: '10000-50000', display: 'USD 10,000 - 50,000'},
    {value: '50000-100000', display: 'USD 50,000 - 100,000'},
    {value: '100000-MAX', display: 'USD +100,000'}
  ]
}

function hasCookie (req) {
  var token = null
  if (req && req.cookies) {
    token = req.cookies['_wl']
    if (!token) {
      token = req.signedCookies['_wl']
    }
  }
  return token
}

module.exports = router
