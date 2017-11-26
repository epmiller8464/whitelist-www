'use strict';

var jwt = require('jsonwebtoken');

var _require = require('./model'),
    User = _require.User;

var login = function login(req, res, next) {
  User.findOne({ email: req.body.email }, function (error, user) {
    if (error) {
      return next(error);
    }
    if (!user) {
      res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function (error, matches) {
        if (matches && !error) {
          var token = jwt.sign({ user: user }, process.env.APP_SECRET);
          res.json({ success: true, message: 'Token granted', token: token });
        } else {
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
};

Api.verify = function (headers) {
  if (headers && headers.authorization) {
    var split = headers.authorization.split(' ');
    if (split.length === 2) return split[1];else return null;
  } else return null;
};

module.exports = { Api: Api };
//# sourceMappingURL=auth.js.map