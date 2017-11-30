'use strict';

var _require = require('./model/index'),
    User = _require.User;

var hasValidEmail = function hasValidEmail(id) {
  return new Promise(function (resolve, reject) {
    User.findById(id, 'verified whitelisted', function (err, doc) {});
  });
};

module.exports = { hasValidEmail: hasValidEmail };
//# sourceMappingURL=kyc.js.map