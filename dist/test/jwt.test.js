'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();

var _require = require('../lib/jsonwebtoken'),
    confirmEmailToken = _require.confirmEmailToken,
    verifyToken = _require.verifyToken;

var uuid = require('uuid');
test('emailVerificationToken', function (done) {
  var id = uuid.v4();
  confirmEmailToken(id).then(function (token) {
    console.log(token);
    expect(token).not.toBeNull();
    done();
  }).catch(function (err) {
    done();
  });
});

test('verifyEmailVerificationToken', function (done) {
  var id = uuid.v4();
  confirmEmailToken(id).then(function (token) {
    verifyToken(token).then(function (result) {
      console.log(result);
      expect(result).not.toBeNull();
      done();
    }).catch(function (err) {
      expect(err).toBeNull();
      done();
    });
  }).catch(function (err) {
    expect(err).toBeNull();
    done();
  });
});
//# sourceMappingURL=jwt.test.js.map