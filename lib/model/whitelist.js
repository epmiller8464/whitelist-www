'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
const {encrypt, decrypt} = require('../crypto')
module.exports = function () {
  // let moment = require('moment')
  let whitelistSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      minLength: 1,
      get: (v) => { return decrypt(v) },
      set: v => encrypt(v)
    },
    ip: {
      type: String,
      get: (v) => { return decrypt(v) },
      set: v => encrypt(v)
    },
    pwh: {String},
    salt: {String},
    purchaseAmount: {
      type: String,
      get: (v) => { return decrypt(v) },
      set: v => encrypt(v)
    },
    cryptoType: {type: String},
    country: String,
    verified: {type: Boolean, default: false, required: true},
    createDate: {type: Date, default: Date.now, required: true},
    publicHandles: {type: mongoose.Schema.Types.Object},
    meta: {type: mongoose.Schema.Types.Object}
  }, {collection: 'whitelist'})

  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('whitelist')
  } catch (e) {
    Model = mongoose.model('whitelist', whitelistSchema)
  }
  return Model
}
