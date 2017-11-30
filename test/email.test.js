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

test('verfify email', done => {
  let id = '5a1e3459ac21c75d06e950ab'
  confirmEmailToken(id)
  .then((token) => {
    Email.sendConfirmation({id: id, to: 'epmiller8464@gmail.com', name: `Test User`, token: token})
    .then((result) => {
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