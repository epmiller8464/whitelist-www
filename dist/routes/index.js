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
    Subscriber = _require3.Subscriber,
    User = _require3.User;

var _require4 = require('../lib/mail'),
    Email = _require4.Email;

var _require5 = require('../lib/jsonwebtoken'),
    verifyToken = _require5.verifyToken;

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()];

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
    WP_URL: process.env.WHITEPAPER_URL,
    csrfToken: req.csrfToken()
  });
});

router.get('/login', function (req, res, next) {
  req.logOut();
  req.user = null;
  req.session = null;
  res.locals = null;
  res.clearCookie('SU_USER');
  res.render('login', {
    title: 'Swytch',
    hideLogin: true,
    csrfToken: req.csrfToken()
  });
});

router.post('/logout', function (req, res, next) {
  req.logOut();
  req.user = null;
  req.session = null;
  res.locals = null;
  res.clearCookie('SU_USER');
  res.redirect('/');
});

router.get('/sign-up', function (req, res, next) {

  res.render('sign-up', {
    title: 'Swytch',
    hideSignup: true,
    csrfToken: req.csrfToken()
  });
});

router.get('/verify/:id', function (req, res, next) {
  var token = req.query.token;

  verifyToken(token).then(function (result) {
    // TODO: blacklist the token
    User.findOneAndUpdate({ _id: result.sub }, { verified: true }, function (err, user) {
      if (err || !user) {
        return next(new Error('We couldn\'t process your request at this time.'));
      }

      if (user) {
        res.redirect('/platform/token-sale');
      }
    });
  }).catch(function (err) {
    return next(err);
  });
});

router.get('/error', function (req, res, next) {
  res.render('error', { message: 'Noting to see here' });
});

module.exports = router;
//# sourceMappingURL=index.js.map