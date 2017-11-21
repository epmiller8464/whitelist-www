'use strict';

var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');
var csurf = require('csurf')({ cookie: true });
var nets = require('nets');

var _require = require('../lib/model'),
    Whitelist = _require.Whitelist;

var moment = require('moment');
var mail = require('../lib/mail');
/* GET home page. */
router.get('/', csurf, function (req, res, next) {
  var contributionAmounts = loadContributionAmounts();
  res.render('index', {
    title: 'Swytch',
    contributionAmounts: contributionAmounts,
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});
router.get('/geo-locate', function (req, res, next) {
  var geo = geoip.lookup(req.query.ip);
  return res.status(200).json(geo);
});

router.post('/whitelist', csurf, function (req, res, next) {

  if (hasCookie(req)) {
    return res.status(200).json({ success: true });
  }

  var body = { response: req.body['g-recaptcha-response'], remoteip: req.ip };
  var email = req.body.email;

  if (!body.response || !email) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  validateSubmitter(body.response, body.remoteip, function (err, result) {
    if (err || !result.success) {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    // var data =
    var record = new Whitelist({
      email: req.body.email,
      ip: req.ip,
      cryptoType: req.body.cryptoType,
      purchaseAmount: req.body.purchaseAmount
    });
    record.save(function (err, doc) {
      if (err) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }

      res.cookie('_wl', Date.now(), {
        httpOnly: true,
        maxAge: moment().add(90, 'days').unix(),
        signed: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
      });
      res.cookie('_wl_ip', req.ip, {
        httpOnly: true,
        maxAge: moment().add(90, 'days').unix(),
        signed: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
      });
      mail({ to: doc.email, name: doc.email.split('@')[0] }).then(function (result) {
        return res.status(200).json({ success: true });
      }).catch(function (e) {
        return res.status(200).json({ success: true });
      });
    });
  });
});

router.get('/whitelist/confirm', function (req, res, next) {});

function validateSubmitter(recaptcha, ip, cb) {
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret= ' + process.env.RECAPTCHA_SECRET + '&response=' + recaptcha + '&remoteip=' + ip;
  var request = {
    url: url,
    method: 'POST',
    encoding: undefined
  };
  nets(request, function (err, res, body) {
    return cb(err, JSON.parse(body));
  });
}

function loadContributionAmounts() {
  return [{ value: null, display: 'USD > 100' }, { value: '100-1000', display: 'USD 100 - 1,000' }, { value: '1000-5000', display: 'USD 1,000 - 5,000' }, { value: '5000-10000', display: 'USD 5,000 - 10,000' }, { value: '10000-50000', display: 'USD 10,000 - 50,000' }, { value: '50000-100000', display: 'USD 50,000 - 100,000' }, { value: '100000-MAX', display: 'USD +100,000' }];
}

function hasCookie(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['_wl'];
    if (!token) {
      token = req.signedCookies['_wl'];
    }
  }
  return token;
}

module.exports = router;
//# sourceMappingURL=index.js.map