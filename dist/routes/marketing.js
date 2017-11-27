'use strict';

var express = require('express');
var router = express.Router();

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
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Swytch',
//     site_key: process.env.RECAPTCHA_KEY,
//     VIDEO_URL: process.env.SWYTCH_VIDEO_URL,
//     WP_URL: process.env.WHITEPAPER_URL,
//     csrfToken: req.csrfToken()
//   })
// })

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim().normalizeEmail()];

router.post('/newsletter/join', validate, function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {}
  Subscriber.create({ email: req.body.email, subscribeTo: ['news-letter'] }, function (err, doc) {
    if (err) {
      return res.status(200).json({ success: false, message: 'Your e-mail is already subscribed.' });
    }
    Email.sendNewsletterWelcomeEmail({ to: req.body.email }).then(function (result) {
      res.status(200).json({ success: true });
    }).catch(function (err) {
      // req.log(err)
      res.status(200).json({ success: false });
    });
  });
});

module.exports = router;
//# sourceMappingURL=marketing.js.map