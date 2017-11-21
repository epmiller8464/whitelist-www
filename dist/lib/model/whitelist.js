'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _require = require('../crypto'),
    encrypt = _require.encrypt,
    decrypt = _require.decrypt;

module.exports = function () {
  // let moment = require('moment')
  var whitelistSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      minLength: 1,
      get: function get(v) {
        return decrypt(v);
      },
      set: function set(v) {
        return encrypt(v);
      }
    },
    ip: {
      type: String,
      get: function get(v) {
        return decrypt(v);
      },
      set: function set(v) {
        return encrypt(v);
      }
    },
    pwh: { String: String },
    salt: { String: String },
    purchaseAmount: {
      type: String,
      get: function get(v) {
        return decrypt(v);
      },
      set: function set(v) {
        return encrypt(v);
      }
    },
    cryptoType: { type: String },
    country: String,
    verified: { type: Boolean, default: false, required: true },
    createDate: { type: Date, default: Date.now, required: true },
    publicHandles: { type: mongoose.Schema.Types.Object },
    meta: { type: mongoose.Schema.Types.Object }
  }, { collection: 'whitelist' });

  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('whitelist');
  } catch (e) {
    Model = mongoose.model('whitelist', whitelistSchema);
  }
  return Model;
};
//# sourceMappingURL=whitelist.js.map