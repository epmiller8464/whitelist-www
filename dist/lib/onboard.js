'use strict';

var _require = require('./mail'),
    Email = _require.Email;

var _require2 = require('../lib/model'),
    Whitelist = _require2.Whitelist;

var _require3 = require('./jsonwebtoken'),
    confirmEmailToken = _require3.confirmEmailToken,
    verifyToken = _require3.verifyToken;

function onBoard(data, cb) {
  console.log('onboarding');
  cb = cb || function () {};
  // todo: persist whitelist
  // var data =
  var record = new Whitelist({
    email: data.email,
    ip: data.ip,
    cryptoType: data.cryptoType,
    purchaseAmount: data.purchaseAmount,
    timeZone: data.timeZone

  });
  record.save(function (err, doc) {
    if (err) {
      console.error(err.message);
      return cb(err);
    }
    // todo: create token
    confirmEmailToken(doc.id).then(function (token) {
      // todo: send email
      Email.sendConfirmation({ to: doc.email, token: token }).then(function (result) {
        console.log(result);
        var updates = { $set: { 'meta.whitelistToken': token } };
        Whitelist.update({ _id: doc.id }, updates, { new: true }, function (err, doc) {
          if (err) {
            console.error(err.message);
          }
          console.log('onboarded');
          return cb(null, doc.toObject());
        });
      }, function (err) {
        console.error(err);
        return cb(err);
      });
      // todo: update whitelist
      console.error(err);
      return cb(err);
    }, function (error) {
      console.error(error);
      return cb(error);
    });
  });
}

function confirmEmail() {}

module.exports = { onBoard: onBoard, confirmEmail: confirmEmail };
//# sourceMappingURL=onboard.js.map