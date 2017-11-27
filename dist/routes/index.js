'use strict';

var express = require('express');
var router = express.Router();
var authenticate = require('../lib/authenticate');

var _require = require('express-validator/check'),
    check = _require.check,
    validationResult = _require.validationResult,
    query = _require.query;

var _require2 = require('express-validator/filter'),
    matchedData = _require2.matchedData,
    sanitize = _require2.sanitize,
    sanitizeQuery = _require2.sanitizeQuery;

var _require3 = require('../lib/model'),
    Subscriber = _require3.Subscriber;

var _require4 = require('../lib/mail'),
    Email = _require4.Email;
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
    WP_URL: process.env.WHITEPAPER_URL,
    csrfToken: req.csrfToken()
  });
});
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
  });
});

router.post('/signup', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});

router.get('/signup/confirmation', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});

module.exports = router;
//# sourceMappingURL=index.js.map