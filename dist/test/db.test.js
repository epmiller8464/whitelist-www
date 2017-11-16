'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();
require('../lib/db')(function () {});

var _require = require('../lib/model'),
    Whitelist = _require.Whitelist;
// let db = DB()


test('whitelist', function (done) {
  var wl = new Whitelist({
    email: 'tom.jones@test.com',
    firstName: 'er',
    lastName: 'me',
    ip: '127.0.0.1',
    purchaseAmount: '1000-5000',
    country: 'US'
  });

  wl.save(function (error, doc) {
    expect(error).toBe(null);
    // expect(doc).toBeGreaterThan(0)
    console.log(doc.email);
    done();
  });
});
//# sourceMappingURL=db.test.js.map