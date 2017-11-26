'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
const {encrypt, decrypt} = require('../crypto')
module.exports = function () {
  const moment = require('moment')
  // let moment = require('moment')
  let whitelistSchema = new Schema({
    email: {
      type: String,
      trim: true,
      // unique: true,
      lowercase: true,
      required: true,
      minLength: 1,
      get: (v) => { return decrypt(v) },
      set: v => encrypt(v)
    },
    ip: {type: String},
    purchaseAmount: {type: String, get: (v) => { return decrypt(v) }, set: v => encrypt(v)},
    cryptoType: {type: String},
    country: String,
    usCitizenAttestation: {type: Boolean, default: false, required: true},
    canParticipate: {type: Boolean, default: true, required: true},
    verified: {type: Boolean, default: false, required: true},
    createDate: {type: Date, default: moment.utc, required: true},
    epoch: {type: Number, default: Date.now, required: true},
    token: {
      jwt: {type: String, unique: true},
      blackListed: {type: Boolean, default: false},
      revoked: {type: Boolean, default: false}
    },
    timeZone: {
      ts: String,
      zoneName: String,
      offset: String
    },
    meta: {type: mongoose.Schema.Types.Object}
  }, {collection: 'whitelist'})
  whitelistSchema.set('toObject', {getters: true})
  whitelistSchema.index({'token': 1}, {sparse: 1})
  // whitelistSchema.index({jwtid: 1}, {unique: true})
  whitelistSchema.index({ip: 1})
  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('whitelist')
  } catch (e) {
    Model = mongoose.model('whitelist', whitelistSchema)
  }
  return Model
}
