'use strict';

var express = require('express');
var router = express.Router();

var _require = require('express-validator/check'),
    check = _require.check,
    validationResult = _require.validationResult;

var _require2 = require('express-validator/filter'),
    sanitize = _require2.sanitize;

var _require3 = require('../lib/model'),
    Subscriber = _require3.Subscriber;

var _require4 = require('../lib/mail'),
    Email = _require4.Email;
/* GET home page. */

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim().normalizeEmail()];

router.post('/newsletter/join', validate, function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  Subscriber.create({ email: req.body.email, subscribedTo: ['news-letter'] }, function (err, doc) {
    if (err) {
      return res.status(200).json({ success: false, message: 'Your e-mail is already subscribed.' });
    }
    Email.sendNewsletterWelcomeEmail({ to: req.body.email }).then(function (result) {
      res.status(200).json({ success: true });
    }).catch(function (err) {
      res.status(200).json({ success: false });
    });
  });
});
module.exports = router;
//# sourceMappingURL=marketing.js.map