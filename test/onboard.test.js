'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
const faker = require('faker')
require('../lib/db')(() => {})

const {onBoard} = require('../lib/onboard')

test('onboard', done => {

  onBoard({
    email: faker.internet.email(),
    ip: faker.internet.ip(),
    purchaseAmount: '1000-5000',
    cryptoType: 'ETH',
    country: 'US',
    meta: {
      termsAccepted: true,
      timezone: {
        offset: '+500',
        zoneName: 'America/New_York'
      }
    }
  }, (err, result) => {
    done()
  })
})