'use strict';

process.env.NODE_ENV = 'development';
require('dotenv').config();

var _require = require('../lib/jsonwebtoken'),
    confirmEmailToken = _require.confirmEmailToken,
    verifyToken = _require.verifyToken;

var uuid = require('uuid');

var _require2 = require('../lib/mail'),
    Email = _require2.Email;

test('emailVerificationToken', function (done) {
  var id = uuid.v4();
  confirmEmailToken(id).then(function (token) {
    console.log(token);
    expect(token).not.toBeNull();

    Email.sendNewsletterWelcomeEmail({ to: 'epmiller8464@gmail.com' }).then(function (result) {
      expect(result).not.toBeNull();
      console.log(result);
      done();
    }).catch(function (e) {
      expect(e).toBeNull();
      done();
    });
  }).catch(function (err) {
    done();
  });
});

test('verfify email', function (done) {
  var id = '5a1e3459ac21c75d06e950ab';
  confirmEmailToken(id).then(function (token) {
    Email.sendConfirmation({ id: id, to: 'epmiller8464@gmail.com', name: 'Test User', token: token }).then(function (result) {
      expect(result).not.toBeNull();
      console.log(result);
      done();
    }).catch(function (e) {
      expect(e).toBeNull();
      done();
    });
  }).catch(function (err) {
    done();
  });
});
//# sourceMappingURL=email.test.js.map