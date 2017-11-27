'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
const faker = require('faker')
require('../lib/db')(() => {})
const {Whitelist, User} = require('../lib/model')
const uuid = require('uuid')
const {DateTime} = require('luxon')
const {confirmEmailToken, verifyToken} = require('../lib/jsonwebtoken')

// let db = DB()
// test('whitelist', (done) => {
//   let dt = DateTime.local()
//
//   var wl = new Whitelist({
//     email: faker.internet.email(),
//     firstName: 'fake-' + faker.name.firstName(),
//     lastName: 'fake-' + faker.name.lastName(),
//     ip: faker.internet.ip(),
//     purchaseAmount: '1000-5000',
//     cryptoType: 'ETH',
//     country: 'US',
//     token: {
//       jwt: uuid.v4(),
//       // blackListed: {type: Boolean, default: false},
//       // revoked: {type: Boolean, default: false}
//     },
//     timeZone: {
//       ts: dt.ts,
//       zoneName: dt.zoneName,
//       offset: dt.offset
//     }
//   })
//
//   wl.save((error, doc) => {
//     expect(error).toBe(null)
//     // expect(doc).toBeGreaterThan(0)
//     confirmEmailToken(doc.id)
//     .then((token) => {
//       let updates = {$set: {'token.jwt': token}}
//
//       Whitelist.update({_id: doc.id}, updates, {new: true}, (err, doc) => {
//         expect(err).toBeNull()
//         console.log(doc.toObject())
//         done()
//       })
//     }).catch((err) => {
//       expect(err).toBeNull()
//       done()
//     })
//   })
// })

test('user', (done) => {
  let dt = DateTime.local()

  var u = new User({
    email: faker.internet.email(),
    firstName: 'fake-' + faker.name.firstName(),
    lastName: 'fake-' + faker.name.lastName(),
    pwd: '12345567'
  })

  u.save((error, doc) => {
    expect(error).toBe(null)
    console.log(doc.toObject())
    done()

  })
})
