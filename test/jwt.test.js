'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
// process.env.PWD = __dirname = process.env.PWD + '/whitelist-www'
const {confirmEmailToken, verifyToken, accessToken, verifyAccessToken} = require('../lib/jsonwebtoken')
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

test('rsa token', done => {
  let id = uuid.v4()
  accessToken(id)
  .then((token) => {
    verifyAccessToken(token)
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
