'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();
var faker = require('faker');
require('../lib/db')(function () {});

var _require = require('../lib/onboard'),
    onBoard = _require.onBoard;

test('onboard', function (done) {

  onBoard({
    email: faker.internet.email(),
    ip: faker.internet.ip(),
    purchaseAmount: '1000-5000',
    cryptoType: 'ETH',
    country: 'US'
  }, function () {
    done();
  });
});
//# sourceMappingURL=onboard.js.map