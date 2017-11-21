'use strict'
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const TOKEN_TYPES = {
  VERIFY_EMAIL_TOKEN: 'verify_email_token'
}
/**
 *
 * @param id
 * @returns {Promise}
 */
const emailVerificationToken = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      let jwtid = uuid.v4()

      let payload = {
        sub: id,
        type: TOKEN_TYPES.VERIFY_EMAIL_TOKEN
      }
      let tgeDate = moment(process.env.TGE_DATE, process.env.TGE_DATE_FORMAT)
      let daysUntilTGE = tgeDate.diff(moment().format(process.env.TGE_DATE_FORMAT), 'days')
      let expiresId = `${daysUntilTGE}d`
      let jwtOpts = {
        expiresIn: expiresId,
        jwtid: jwtid,
        subject: id,
        issuer: process.env.ADMIN_EMAIL
      }
      return resolve(jwt.sign(payload, process.env.PK, jwtOpts))
    } catch (e) {
      return reject(e)
    }
  })
}
const verifyEmailVerificationToken = function (jwt) {
  return new Promise(function (resolve, reject) {
    try {
      return resolve(jwt.verify(jwt, process.env.PK))
    } catch (e) {
      return reject(e)
    }
  })
}
module.exports = {emailVerificationToken, verifyEmailVerificationToken, TOKEN_TYPES}