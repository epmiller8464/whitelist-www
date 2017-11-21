'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();
var faker = require('faker');
require('../lib/db')(function () {});

var _require = require('../lib/model'),
    Whitelist = _require.Whitelist;
// let db = DB()


test('whitelist', function (done) {
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
  });

  wl.save(function (error, doc) {
    expect(error).toBe(null);
    // expect(doc).toBeGreaterThan(0)
    console.log(doc.toObject());
    done();
  });
});
//# sourceMappingURL=db.test.js.map