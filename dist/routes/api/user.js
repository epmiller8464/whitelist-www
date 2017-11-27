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

var _require3 = require('../../lib/model'),
    User = _require3.User;

var _require4 = require('../../lib/mail'),
    Email = _require4.Email;

var _require5 = require('../../lib/jsonwebtoken'),
    confirmEmailToken = _require5.confirmEmailToken,
    verifyToken = _require5.verifyToken;

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim().normalizeEmail()];

router.post('/', validate, function (req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  var user = new User(req.body);

  user.save(function (err, doc) {
    if (err) {
      return res.status(200).json({ success: false, message: 'Your e-mail is already subscribed.' });
    }
    confirmEmailToken(doc.id).then(function (token) {

      Email.sendConfirmation({ to: req.body.email, name: doc.first_name + ' ' + doc.last_name, token: token }).then(function (result) {
        return res.status(200).json({ success: true, data: doc.toObject() });
      }).catch(function (err) {
        throw err;
      });
    }).catch(function (err) {
      return res.status(400).json({ error: true, message: err.message });
    });
  });
});

module.exports = router;
//# sourceMappingURL=user.js.map