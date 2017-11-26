'use strict';

var _ = require('lodash');
var authorize = function authorize(req, res, next) {
  var user = req.user;
  req.called = true;
  if (user && _.includes(['admin', 'user'], req.user.role)) {
    return next();
  }
  var m = encodeURIComponent('The page not found.');
  req.log.error('request for protected routes.');
  return res.redirect('/logout');
};
authorize.unless = require('express-unless');
module.exports = { authorize: authorize };
//# sourceMappingURL=authorization.js.map