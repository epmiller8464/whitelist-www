'use strict'
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const nonce = require('nonce')()
const crypto = require('crypto')
const fs = require('fs')
const TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token',
  AUTH_TOKEN: 'auth_token'
}
/**
 * @name confirmEmailToken
 * @param id {String} id of the subject
 * @returns {Promise}
 */
const confirmEmailToken = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      let jwtid = uuid.v4()

      let payload = {
        sub: id,
        type: TOKEN_TYPES.VERIFY_EMAIL_TOKEN,
        nonce: nonce()
      }
      let tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT)
      let daysUntilTGE = tgeDate.diff(moment({}).format(process.env.TGE_DATE_FORMAT), 'days')
      let expiresId = `${daysUntilTGE}d`
      let jwtOpts = {
        expiresIn: expiresId,
        jwtid: jwtid,
        // subject: id,
        issuer: process.env.ADMIN_EMAIL
      }
      return resolve(jwt.sign(payload, process.env.PK, jwtOpts))
    } catch (e) {
      return reject(e)
    }
  })
}

const accessToken = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      let jwtid = uuid.v4()

      let payload = {
        sub: id,
        type: TOKEN_TYPES.AUTH_TOKEN,
        nonce: nonce()
      }
      let pk = Buffer.from(process.env.KEY, 'base64')
      if (!pk) {
        console.warn('Attempting to fall back to file')
        pk = fs.readFileSync(`${process.env.PWD}/server.key`)
      }

      let jwtOpts = {
        expiresIn: '1d',
        jwtid: jwtid,
        // subject: id,
        issuer: process.env.ADMIN_EMAIL,
        algorithm: 'RS256'
      }
      return resolve(jwt.sign(payload, pk.toString('utf8'), jwtOpts))
    } catch (e) {
      return reject(e)
    }
  })
}
const verifyAccessToken = function (token) {
  return new Promise(function (resolve, reject) {
    try {
      let pk = fs.readFileSync(`${process.env.PWD}/STAR_swytch_io.crt`)
      jwt.verify(token, pk, {
        maxAge: '1d', algorithms: ['RS256']
      }, (tokenError, payLoad) => {
        if (tokenError) {
          return reject(tokenError)
        }
        return resolve(payLoad)
      })
    } catch (e) {
      return reject(e)
    }
  })
}

const refreshToken = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      let jwtid = uuid.v4()

      let payload = {
        sub: id,
        type: TOKEN_TYPES.VERIFY_EMAIL_TOKEN,
        nonce: nonce()
      }
      let tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT)
      let daysUntilTGE = tgeDate.diff(moment({}).format(process.env.TGE_DATE_FORMAT), 'days')
      let expiresId = `${daysUntilTGE}d`
      let jwtOpts = {
        expiresIn: expiresId,
        jwtid: jwtid,
        // subject: id,
        issuer: process.env.ADMIN_EMAIL
      }
      return resolve(jwt.sign(payload, process.env.PK, jwtOpts))
    } catch (e) {
      return reject(e)
    }
  })
}
/**
 *
 * @param jwt
 * @returns {Promise}
 */
const verifyToken = function (token) {
  return new Promise(function (resolve, reject) {
    try {
      let tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT)
      let daysUntilTGE = tgeDate.diff(moment({}).format(process.env.TGE_DATE_FORMAT), 'days')
      let expiresId = `${daysUntilTGE}d`
      jwt.verify(token, process.env.PK, {maxAge: expiresId}, (tokenError, payLoad) => {
        if (tokenError) {
          return reject(tokenError)
        }
        return resolve(payLoad)
      })
    } catch (e) {
      return reject(e)
    }
  })
}

const generateAccessToken = function (req, res, next) {
  req.session.token = req.session.token || {}
  req.session.refreshToken = jwt.sign({id: req.user._id}, process.env.CS, {expiresIn: (120 * 60)})
  next()
}

module.exports = {
  confirmEmailToken,
  generateAccessToken,
  verifyToken,
  accessToken,
  refreshToken,
  verifyAccessToken
}


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

