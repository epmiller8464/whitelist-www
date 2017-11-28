'use strict';

var express = require('express');
var router = express.Router();
var authenticate = require('../../lib/authenticate');

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
    accessToken = _require5.accessToken;

var validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()];

router.post('/login', validate, authenticate, function (req, res, next) {
  next();
}, function (req, res, next) {

  res.status(200).json({ token: '' });
});

module.exports = router;
//# sourceMappingURL=auth.js.map