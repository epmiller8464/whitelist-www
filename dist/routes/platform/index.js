'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('platform', { title: 'Swytch Platform', csrfToken: req.csrfToken() });
});
router.get('/error', function (req, res, next) {
  res.render('error', { message: 'Opps we\'ll fix that...' });
});

module.exports = router;
//# sourceMappingURL=index.js.map