'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();
var faker = require('faker');
require('../lib/db')(function () {});

var _require = require('../lib/model'),
    Whitelist = _require.Whitelist,
    User = _require.User;

var uuid = require('uuid');

var _require2 = require('luxon'),
    DateTime = _require2.DateTime;

var _require3 = require('../lib/jsonwebtoken'),
    confirmEmailToken = _require3.confirmEmailToken,
    verifyToken = _require3.verifyToken;

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

test('user', function (done) {
  var dt = DateTime.local();

  var u = new User({
    email: faker.internet.email(),
    firstName: 'fake-' + faker.name.firstName(),
    lastName: 'fake-' + faker.name.lastName(),
    pwd: '12345567'
  });

  u.save(function (error, doc) {
    expect(error).toBe(null);
    console.log(doc.toObject());
    done();
  });
});
//# sourceMappingURL=db.test.js.map