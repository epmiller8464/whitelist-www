'use strict'
const mongoose = require('mongoose')
let moment = require('moment')()

module.exports = function () {
  let Model

  let tokenSchema = new mongoose.Schema({
    token: {type: String, required: true},
    createDate: {type: Date, default: moment.utc, required: true},
    epoch: {type: Number, default: Date.now, required: true},
    jwt_id: {type: String, required: true},
    blackListed: {type: Boolean, required: true, default: false},
    revoked: {type: Boolean, required: true, default: false},
    type: {type: String, required: true, enum: ['verification', 'refresh', 'access']}
  }, {collection: 'token'})

  tokenSchema.index({token: 1}, {unique: true})
  tokenSchema.index({jwtid: 1}, {unique: true})
  tokenSchema.index({type: 1})

  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('token')
  } catch (e) {
    Model = mongoose.model('token', tokenSchema)
  }
  return Model
}