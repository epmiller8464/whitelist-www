'use strict';

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token'
};
/**
 *
 * @param id
 * @returns {Promise}
 */
var emailVerificationToken = function emailVerificationToken(id) {
  return new Promise(function (resolve, reject) {
    try {
      var jwtid = uuid.v4();

      var payload = {
        sub: id,
        type: TOKEN_TYPES.VERIFY_EMAIL_TOKEN
      };
      var tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT);
      var daysUntilTGE = tgeDate.diff(moment().format(process.env.TGE_DATE_FORMAT), 'days');
      var expiresId = daysUntilTGE + 'd';
      var jwtOpts = {
        expiresIn: expiresId,
        jwtid: jwtid,
        subject: id,
        issuer: process.env.ADMIN_EMAIL
      };
      return resolve(jwt.sign(payload, process.env.PK, jwtOpts));
    } catch (e) {
      return reject(e);
    }
  });
};
var verifyEmailVerificationToken = function verifyEmailVerificationToken(jwt) {
  return new Promise(function (resolve, reject) {
    try {
      return resolve(jwt.verify(jwt, process.env.PK));
    } catch (e) {
      return reject(e);
    }
  });
};
module.exports = { emailVerificationToken: emailVerificationToken, verifyEmailVerificationToken: verifyEmailVerificationToken, TOKEN_TYPES: TOKEN_TYPES };
//# sourceMappingURL=jsonwebtoken.js.map