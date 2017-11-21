'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
const faker = require('faker')
require('../lib/db')(() => {})
const {Whitelist} = require('../lib/model')
// let db = DB()
test('whitelist', (done) => {
  var wl = new Whitelist({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    ip: faker.internet.ip(),
    purchaseAmount: '1000-5000',
    cryptoType: 'ETH',
    country: 'US',
    public_handles: {
      keybase: {
        username: 'ghost_mac'
      }
    }
  })

  wl.save((error, doc) => {
    expect(error).toBe(null)
    // expect(doc).toBeGreaterThan(0)
    console.log(doc.toObject())
    done()
  })
})
