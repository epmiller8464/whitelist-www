'use strict'
process.env.NODE_ENV = 'development'
require('dotenv').config()
require('../lib/db')(() => {})
const {Whitelist} = require('../lib/model')
// let db = DB()
test('whitelist', (done) => {
  var wl = new Whitelist({
    email: 'tom.jones@test.com',
    firstName: 'er',
    lastName: 'me',
    ip: '127.0.0.1',
    purchaseAmount: '1000-5000',
    country: 'US'
  })

  wl.save((error, doc) => {
    expect(error).toBe(null)
    // expect(doc).toBeGreaterThan(0)
    console.log(doc.email)
    done()
  })
})
