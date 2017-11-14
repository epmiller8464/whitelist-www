'use strict';

var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');
var publicIp = require('public-ip');
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Swytch' });
});
router.get('/geo-locate', function (req, res, next) {
  var geo = geoip.lookup(req.query.ip);
  return res.status(200).json(geo);
});
module.exports = router;
//# sourceMappingURL=index.js.map