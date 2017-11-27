'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
const {confirmEmailToken, verifyToken} = require('../lib/jsonwebtoken')
const uuid = require('uuid')
const {Email} = require('../lib/mail')
test('emailVerificationToken', done => {
  let id = uuid.v4()
  confirmEmailToken(id)
  .then((token) => {
    console.log(token)
    expect(token).not.toBeNull()

    Email.sendNewsletterWelcomeEmail({to: 'epmiller8464@gmail.com'}).then((result) => {
      expect(result).not.toBeNull()
      console.log(result)
      done()
    }).catch((e) => {
      expect(e).toBeNull()
      done()
    })
  }).catch((err) => {
    done()
  })
})