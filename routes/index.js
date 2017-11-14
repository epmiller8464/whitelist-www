var express = require('express')
var router = express.Router()
const geoip = require('geoip-lite')
const publicIp = require('public-ip')
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {title: 'Swytch'})
})
router.get('/geo-locate', (req, res, next) => {
  var geo = geoip.lookup(req.query.ip)
  return res.status(200).json(geo)
})
module.exports = router
