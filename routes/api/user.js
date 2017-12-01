'use strict'
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator/check')
const {sanitize} = require('express-validator/filter')
const {User} = require('../../lib/model')
const {Email} = require('../../lib/mail')
const {confirmEmailToken} = require('../../lib/jsonwebtoken')
const validate = [check('email').isEmail().withMessage('must be an email').trim().normalizeEmail(), check('first_name').isAlphanumeric().trim(), check('last_name').isAlphanumeric().trim(), sanitize('email').trim(), sanitize('first_name').trim(), sanitize('last_name').trim()]

router.post('/', validate, function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.mapped()})
  }

  var user = new User(req.body)

  user.save((err, doc) => {
    if (err) {
      return res.status(200).json({success: false, message: 'Your e-mail is already subscribed.'})
    }
    confirmEmailToken(doc.id).then((token) => {
      Email.sendConfirmation({id: doc.id, to: req.body.email, name: `${doc.first_name} ${doc.last_name}`, token: token})
      .then((result) => {
        return res.status(200).json({success: true, data: doc.toObject()})

      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      return res.status(400).json({error: true, message: err.message})
    })
  })
})

module.exports = router
