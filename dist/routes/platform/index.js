'use strict';

var express = require('express');
var router = express.Router();
// const authenticate = require('../../lib/authenticate')

var _require = require('express-validator/check'),
    check = _require.check;

var _require2 = require('express-validator/filter'),
    sanitize = _require2.sanitize;

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()];
var nets = require('nets');
var notifier = require('../../lib/notifier');

var _require3 = require('../../lib/jsonwebtoken'),
    confirmEmailToken = _require3.confirmEmailToken,
    verifyToken = _require3.verifyToken;

var _require4 = require('../../lib/mail'),
    Email = _require4.Email;

var _require5 = require('../../lib/model/index'),
    Whitelist = _require5.Whitelist,
    User = _require5.User;

router.get('/', function (req, res, next) {
  return res.redirect('/platform/token-sale');
});

router.get('/token-sale', function (req, res, next) {

  var step = 'verify-email';
  if (req.user.verified) {
    step = 'whitelist';
  }
  if (req.user.verified && req.user.whitelisted) {
    step = 'complete';
  }

  var countries = require('../../lib/countries')();
  var user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    verified: req.user.verified,
    whitelisted: req.user.whitelisted,
    id: req.user._id
  };
  res.render('platform/token_sale', {
    title: 'Swytch Pre-Sale Whitelist Registration',
    user: user,
    countries: countries,
    step: step,
    contributionAmounts: loadContributionAmounts(),
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});
router.post('/token-sale', function (req, res, next) {

  var body = { response: req.body['g-recaptcha-response'], remoteip: req.ip };

  if (!body.response) {
    return res.status(400).json({ error: true, message: 'Invalid parameters' });
  }

  validateSubmitter(body.response, body.remoteip, function (err, result) {
    if (err || !result.success) {
      return res.status(400).json({ error: true, message: 'Validation failed.' });
    }
    var whitelist = new Whitelist({
      ip: req.ip,
      country_code: req.body.country_code,
      crypto_type: req.body.crypto_type,
      purchase_amount: req.body.purchase_amount,
      timezone: req.body.timezone,
      us_citizen: req.body.us_citizen,
      can_participate: !req.body.us_citizen,
      owner_id: req.user._id,
      verified: true
    });
    whitelist.save(function (err) {

      User.findOneAndUpdate({ _id: req.user._id }, { whitelisted: true }, { new: true }, function (error, doc) {

        req.user = req.session.me = doc.toObject();
        return res.status(200).json({ success: true });
      });
    });
  });
});
router.get('/resend/verify-email', function (req, res, next) {

  var id = req.query.id;

  if (id !== req.user._id.toString()) {
    return next(new Error('Unauthorized'));
  }

  confirmEmailToken(id).then(function (token) {
    Email.sendConfirmation({
      id: id,
      to: req.user.email,
      name: req.user.first_name + ' ' + req.user.last_name,
      token: token
    }).then(function (result) {

      res.redirect('/platform/token-sale');
    }).catch(function (e) {
      return next(new Error('We couldn\'t process your request at this time.'));
    });
  }).catch(function (err) {
    return next(new Error('We couldn\'t process your request at this time.'));
  });
});

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
  return [{ value: '0-100', display: 'USD > 100' }, { value: '100-1000', display: 'USD 100 - 1,000' }, { value: '1000-5000', display: 'USD 1,000 - 5,000' }, { value: '5000-10000', display: 'USD 5,000 - 10,000' }, { value: '10000-50000', display: 'USD 10,000 - 50,000' }, { value: '50000-100000', display: 'USD 50,000 - 100,000' }, { value: '100000-MAX', display: 'USD +100,000' }];
}

module.exports = router;
//# sourceMappingURL=index.js.map