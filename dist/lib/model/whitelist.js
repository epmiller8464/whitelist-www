'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _require = require('../crypto'),
    encrypt = _require.encrypt,
    decrypt = _require.decrypt;

module.exports = function () {
  var moment = require('moment');
  // let moment = require('moment')
  var whitelistSchema = new Schema({
    ip: { type: String, required: true },
    purchase_amount: { type: String, get: function get(v) {
        return decrypt(v);
      }, set: function set(v) {
        return encrypt(v);
      } },
    crypto_type: { type: String },
    country_code: { type: String, required: true },
    us_citizen: { type: Boolean, default: false, required: true },
    can_participate: { type: Boolean, default: true, required: true },
    verified: { type: Boolean, default: false, required: true },
    create_date: { type: Date, default: moment.utc, required: true },
    timezone: {
      ts: String,
      zoneName: String,
      offset: String
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    meta: { type: mongoose.Schema.Types.Object }
  }, { collection: 'whitelist' });
  whitelistSchema.set('toObject', { getters: true });
  // whitelistSchema.index({jwtid: 1}, {unique: true})
  whitelistSchema.index({ ip: 1 });
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