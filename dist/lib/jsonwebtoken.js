'use strict';

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var nonce = require('nonce')();
var crypto = require('crypto');
var fs = require('fs');
var TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token',
  AUTH_TOKEN: 'auth_token'
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

var accessToken = function accessToken(id) {
  return new Promise(function (resolve, reject) {
    try {
      var jwtid = uuid.v4();

      var payload = {
        sub: id,
        type: TOKEN_TYPES.AUTH_TOKEN,
        nonce: nonce()
      };
      var pk = Buffer.from(process.env.KEY, 'base64');
      if (!pk) {
        console.warn('Attempting to fall back to file');
        pk = fs.readFileSync(process.env.PWD + '/server.key');
      }

      var jwtOpts = {
        expiresIn: '1d',
        jwtid: jwtid,
        // subject: id,
        issuer: process.env.ADMIN_EMAIL,
        algorithm: 'RS256'
      };
      return resolve(jwt.sign(payload, pk.toString('utf8'), jwtOpts));
    } catch (e) {
      return reject(e);
    }
  });
};
var verifyAccessToken = function verifyAccessToken(token) {
  return new Promise(function (resolve, reject) {
    try {
      var pk = fs.readFileSync(process.env.PWD + '/STAR_swytch_io.crt');
      jwt.verify(token, pk, {
        maxAge: '1d', algorithms: ['RS256']
      }, function (tokenError, payLoad) {
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

var refreshToken = function refreshToken(id) {
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

var generateAccessToken = function generateAccessToken(req, res, next) {
  req.session.token = req.session.token || {};
  req.session.refreshToken = jwt.sign({ id: req.user._id }, process.env.CS, { expiresIn: 120 * 60 });
  next();
};

module.exports = {
  confirmEmailToken: confirmEmailToken,
  generateAccessToken: generateAccessToken,
  verifyToken: verifyToken,
  accessToken: accessToken,
  refreshToken: refreshToken,
  verifyAccessToken: verifyAccessToken
};

// const generateToken = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return next(new Error('Unauthorized'))
//   }
//
//   if (req.session.token) {
//     jwt.verify(req.session.token, config.cs, (err, decoded) => {
//       if (err) {
//         req.session.token = jwt.sign({id: req.user._id}, config.cs, {expiresIn: (120 * 60)})
//       }
//       return next()
//     })
//   } else {
//     req.session.token = jwt.sign({id: req.user._id}, config.cs, {expiresIn: (120 * 60)})
//     return next()
//   }
// }
// function validateRefreshToken (req, res, next) {
//   User.find({refreshToken: req.body}, function (err, user) {
//     if (err) {
//       return next(err);
//     }
//     req.user = user;
//     next();
//   });
// }
/*
 How to generate a long-lived token:
 Start with a short-lived token generated on a client and ship it back to your server.
 Use the user token, your app ID and app secret to make the following call from your server to Facebook's servers:
 */

// function rejectToken (req, res, next) {
//   db.client.rejectToken(req.body, next)
// }

// ////////////////////
// token generation //
// ////////////////////
//
// function generateRefreshToken (req, res, next) {
//   if (req.query.permanent === 'true') {
//     req.token.refreshToken = req.user.clientId.toString() + '.' + crypto.randomBytes(
//       40).toString('hex')
//     db.client.storeToken({
//       id: req.user.clientId,
//       refreshToken: req.token.refreshToken
//     }, next)
//   } else {
//     next()
//   }
// }
//# sourceMappingURL=jsonwebtoken.js.map