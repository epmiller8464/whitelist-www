'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();
// process.env.PWD = __dirname = process.env.PWD + '/whitelist-www'

var _require = require('../lib/jsonwebtoken'),
    confirmEmailToken = _require.confirmEmailToken,
    verifyToken = _require.verifyToken,
    accessToken = _require.accessToken,
    verifyAccessToken = _require.verifyAccessToken;

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

test('rsa token', function (done) {
  var id = uuid.v4();
  accessToken(id).then(function (token) {
    verifyAccessToken(token).then(function (result) {
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