'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
const {confirmEmailToken, verifyToken} = require('../lib/jsonwebtoken')
const uuid = require('uuid')
test('emailVerificationToken', done => {
  let id = uuid.v4()
  confirmEmailToken(id)
  .then((token) => {
    console.log(token)
    expect(token).not.toBeNull()
    done()
  }).catch((err) => {
    done()
  })
})

test('verifyEmailVerificationToken', done => {
  let id = uuid.v4()
  confirmEmailToken(id)
  .then((token) => {
    verifyToken(token)
    .then((result) => {
      console.log(result)
      expect(result).not.toBeNull()
      done()
    }).catch((err) => {
      expect(err).toBeNull()
      done()
    })
  }).catch((err) => {
    expect(err).toBeNull()
    done()
  })

})
