'use strict'
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('platform', {title: 'Swytch Platform', csrfToken: req.csrfToken()})
})
router.get('/error', (req, res, next) => {
  res.render('error', {message: 'Opps we\'ll fix that...'})
})

module.exports = router
