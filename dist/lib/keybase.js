'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypt = require('crypto');
var nets = require('nets');
var API_ROOT = 'https://keybase.io/_/api/1.0';

var API_ROUTES = {
  SIGNUP: 'signup.json',
  GETSALT: 'getsalt.json',
  LOGIN: 'login.json'
};

var SignUp = function SignUp() {
  _classCallCheck(this, SignUp);

  var self = this;
  self.name = 'Chris';
  self.email = 'cc@chriscoyne.com';
  self.username = 'chris';
  self.pwh = 'f0909fe23409...';
  self.salt = '7d34343eeeee...';
  self.invitation_id = '0000000000123';
};

var getSalt = function getSalt(user, cb) {
  var params = { email_or_username: 'chris_swytch_pgp' };
  var request = {
    url: API_ROOT + '/' + API_ROUTES.GETSALT,
    method: 'POST',
    encoding: undefined,
    body: JSON.stringify(params)
  };
  nets(request, function (err, res, body) {
    return cb(err, JSON.parse(body));
  });
};
//# sourceMappingURL=keybase.js.map