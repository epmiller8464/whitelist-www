'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment')();

module.exports = function () {
  var Model = void 0;

  var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    createDate: { type: Date, required: true, default: moment.utc },
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
    role: String,
    type: { type: String, required: true },
    history: [mongoose.Schema.Types.Object],
    meta: { type: mongoose.Schema.Types.Object }
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }, { collection: 'user' });

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