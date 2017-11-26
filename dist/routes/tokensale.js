'use strict';
'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../lib/authenticate'),
    authenticate = _require.authenticate;

/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('token-sale', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});

router.get('/signup', function (req, res, next) {
  res.render('index', {
    title: 'Swytch',
    site_key: process.env.RECAPTCHA_KEY,
    csrfToken: req.csrfToken()
  });
});

router.post('/verify-identity', function (req, res, next) {});

module.exports = router;
//# sourceMappingURL=tokensale.js.map