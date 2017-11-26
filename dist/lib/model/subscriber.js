'use strict';
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _require = require('../crypto'),
    encrypt = _require.encrypt,
    decrypt = _require.decrypt;

module.exports = function () {
  var moment = require('moment');
  // let moment = require('moment')
  var schema = new Schema({
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
    verified: { type: Boolean, required: true, default: false },
    subscribedTo: [String],
    unsubscribeFrom: [String],
    unsubscribeAll: { type: Boolean, required: true, default: false },
    meta: { type: mongoose.Schema.Types.Object }
  }, { collection: 'subscriber' });
  schema.index({ email: 1 });
  var Model = void 0;
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('subscriber');
  } catch (e) {
    Model = mongoose.model('subscriber', schema);
  }
  return Model;
};
//# sourceMappingURL=subscriber.js.map