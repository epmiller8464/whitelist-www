'use strict'
const express = require('express')
const router = express.Router()
const authenticate = require('../../lib/authenticate')
const {check, validationResult, query} = require('express-validator/check')
const {matchedData, sanitize, sanitizeQuery} = require('express-validator/filter')
const {User} = require('../../lib/model')
const {Email} = require('../../lib/mail')
const {accessToken} = require('../../lib/jsonwebtoken')
const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), sanitize('email').trim()]

router.post('/login', validate, authenticate, (err, req, res, next) => {
  if (err) {
    return res.status(400).json({error: true, message: 'Unauthorized'})
  }
  return next()
}, function (req, res, next) {
  // todo: add jwt response
  res.status(200).json({success: true})
})

module.exports = router
