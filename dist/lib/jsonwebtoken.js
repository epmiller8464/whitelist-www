'use strict';

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var nonce = require('nonce')();
var TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token'
};
/**
 * @name confirmEmailToken
 * @param id {String} id of the subject
 * @returns {Promise}
 */
var confirmEmailToken = function confirmEmailToken(id) {
  return new Promise(function (resolve, reject) {
    try {
      var jwtid = uuid.v4();

      var payload = {
        sub: id,
        type: TOKEN_TYPES.VERIFY_EMAIL_TOKEN,
        nonce: nonce()
      };
      var tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT);
      var daysUntilTGE = tgeDate.diff(moment({}).format(process.env.TGE_DATE_FORMAT), 'days');
      var expiresId = daysUntilTGE + 'd';
      var jwtOpts = {
        expiresIn: expiresId,
        jwtid: jwtid,
        // subject: id,
        issuer: process.env.ADMIN_EMAIL
      };
      return resolve(jwt.sign(payload, process.env.PK, jwtOpts));
    } catch (e) {
      return reject(e);
    }
  });
};
/**
 *
 * @param jwt
 * @returns {Promise}
 */
var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    try {
      var tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT);
      var daysUntilTGE = tgeDate.diff(moment({}).format(process.env.TGE_DATE_FORMAT), 'days');
      var expiresId = daysUntilTGE + 'd';
      jwt.verify(token, process.env.PK, { maxAge: expiresId }, function (tokenError, payLoad) {
        if (tokenError) {
          return reject(tokenError);
        }
        return resolve(payLoad);
      });
    } catch (e) {
      return reject(e);
    }
  });
};
module.exports = { confirmEmailToken: confirmEmailToken, verifyToken: verifyToken };
//# sourceMappingURL=jsonwebtoken.js.map