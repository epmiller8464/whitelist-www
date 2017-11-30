'use strict'
const {User} = require('./model/index')
const hasValidEmail = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, 'verified whitelisted', (err, doc) => {

    })
  })
}

module.exports = {hasValidEmail}