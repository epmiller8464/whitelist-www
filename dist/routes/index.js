'use strict';

var express = require('express');
var router = express.Router();
var authenticate = require('../lib/authenticate');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});
router.post('/subscribe', function (req, res, next) {

  res.status(200).json({ success: true });
});
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