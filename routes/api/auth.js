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

router.post('/login', validate, authenticate, function (req, res, next) {
  res.status(200).json({token: ''})
})

module.exports = router
