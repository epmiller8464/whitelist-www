'use strict'
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const nonce = require('nonce')()
const TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token'
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
module.exports = {confirmEmailToken, verifyToken}
