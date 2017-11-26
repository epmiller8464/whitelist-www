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
      res.status(401).json({ success: false, message: 'Unauthorized' });
    } else {
      user.comparePassword(req.body.password, function (error, matches) {
        if (matches && !error) {
          var jwtOpts = {
            expiresIn: '1d'
          };
          var token = jwt.sign({ user: user }, process.env.APP_SECRET, jwtOpts);

          res.json({ success: true });
        } else {
          next(new Error('Unauthorized'));
          res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
};

module.exports = { login: login };
//# sourceMappingURL=login.js.map