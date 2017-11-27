'use strict'
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
const {encrypt, decrypt} = require('../crypto')
module.exports = function () {
  const moment = require('moment')
  // let moment = require('moment')
  let schema = new Schema({
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      minLength: 1,
      match: /.+\@.+\..+/,
      // get: (v) => { return decrypt(v) },
      // set: v => encrypt(v)
    },
    verified: {type: Boolean, required: true, default: false},
    subscribedTo: [String],
    unsubscribeFrom: [String],
    unsubscribeAll: {type: Boolean, required: true, default: false},
    meta: {type: mongoose.Schema.Types.Object}
  }, {collection: 'subscriber'})
  schema.index({email: 1})
  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('subscriber')
  } catch (e) {
    Model = mongoose.model('subscriber', schema)
  }
  return Model
}
