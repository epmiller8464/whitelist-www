'use strict'
const {Email} = require('./mail')
const {Whitelist} = require('../lib/model')
const {confirmEmailToken, verifyToken} = require('./jsonwebtoken')

function onBoard (data, cb) {
  console.log('onboarding')
  cb = cb || function () {}
  // todo: persist whitelist
  // var data =
  let record = new Whitelist({
    email: data.email,
    ip: data.ip,
    cryptoType: data.cryptoType,
    purchaseAmount: data.purchaseAmount,
    timeZone: data.timeZone

  })
  record.save((err, doc) => {
    if (err) {
      console.error(err.message)
      return cb(err)
    }
    // todo: create token
    confirmEmailToken(doc.id).then((token) => {
      // todo: send email
      Email.sendConfirmation({to: doc.email, token})
      .then((result) => {
        console.log(result)
        let updates = {$set: {'meta.whitelistToken': token}}
        Whitelist.update({_id: doc.id}, updates, {new: true}, (err, doc) => {
          if (err) {
            console.error(err.message)
          }
          console.log('onboarded')
          return cb(null, doc.toObject())
        })
      }, (err) => {
        console.error(err)
        return cb(err)
      })
      // todo: update whitelist
      console.error(err)
      return cb(err)
    }, (error) => {
      console.error(error)
      return cb(error)
    })
  })
}

function confirmEmail () {

}

const Business = {
  resendVerifyEmail: (to, context) => {

  }
}

module.exports = {onBoard, confirmEmail}