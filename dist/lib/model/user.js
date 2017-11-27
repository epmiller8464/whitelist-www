'use strict';

var mongoose = require('mongoose');
// let moment = require('moment')()
// Hey, eric miller,
//   Please verify your email.
//
//
//
//   Verify Your Account
// {"consumer":{"UID":"d5f45290c28937663bffacbb08ce2a6c866472ace3b4dad3bc31d1dbdd63cc1a"},"device":{"ID":"02583cb73720d0f586e749cdd389bdf28f68ec591c4f7ad3376f0646e4477644aa2ab8cd17e31125435d69c09c85f190","type":"Desktop"},"e2ee":"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hnKqkmA6c2Dk68Ra+2tCPw==","SLT":"150010966755740097116541029855982339314"}
module.exports = function () {
  var moment = require('moment');
  var bcrypt = require('bcrypt');

  var Model = void 0;
  // 'https://www.thetatoken.org/verify/
  // 9ab52cb2-d012-11e7-aaa7-3b535aee91ce?token=9ab52c26-d012-11e7-aaa6-53ee023d7a4d
  // &email=epmiller8464@gmail.com'
  /* phone: {
        phone_number: {
          type: String,
          trim: true,
          required: true,
          maxLength: 10,
          minLength: 10,
          match: /\d{10}\b/,
          set: normalizePhoneNumber,
          get: internationalPhoneNumber
         },
        country_code: {
          type: String,
          trim: true,
          uppercase: true,
          maxLength: 2,
          minLength: 2,
          required: false,
          default: 'US'
        },
      }, */
  var UserSchema = new mongoose.Schema({
    first_name: { type: String, trim: true, required: false, minLength: 1 },
    last_name: { type: String, trim: true, required: false, minLength: 1 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
      minLength: 1,
      match: /.+\@.+\..+/,
      unique: true
    },
    pwd: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
    flags: [String],
    ip: [String],
    whitelisted: Boolean,
    role: { type: String, required: true, enum: ['guest', 'user', 'admin'], default: 'guest' },
    contact: { type: mongoose.Schema.Types.Object },
    history: [mongoose.Schema.Types.Object],
    meta: { type: mongoose.Schema.Types.Object }
  }, { timestamps: { created_at: 'created_at', updated_at: 'updated_at' } }, { collection: 'user' });

  UserSchema.index({ username: 1 });
  UserSchema.index({ email: 1 });

  UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (error, salt) {
        if (error) return next(error);
        bcrypt.hash(user.pwd, salt, function (error, hash) {
          if (error) return next(error);
          user.pwd = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });

  UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.pwd, function (error, matches) {
      if (error) return callback(error);
      callback(null, matches);
    });
  };
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('user');
  } catch (e) {
    Model = mongoose.model('user', UserSchema);
  }
  return Model;
};
//# sourceMappingURL=user.js.map