'use strict'
var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
let moment = require('moment')()

module.exports = function () {
  let Model

  let UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    createDate: {type: Date, required: true, default: moment.utc},
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
      minLength: 1,
      match: /.+\@.+\..+/,
      unique: true
    },
    pwd: {type: String, required: true},
    verified: {type: Boolean, required: true, default: false},
    flags: [String],
    ip: [String],
    whitelisted: Boolean,
    role: String,
    type: {type: String, required: true},
    history: [mongoose.Schema.Types.Object],
    meta: {type: mongoose.Schema.Types.Object}
  }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}, {collection: 'user'})

  UserSchema.index({username: 1})
  UserSchema.index({email: 1})

  UserSchema.pre('save', function (next) {
    const user = this
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error)
        bcrypt.hash(user.pwd, salt, (error, hash) => {
          if (error) return next(error)
          user.pwd = hash
          next()
        })
      })
    } else {
      return next()
    }
  })

  UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.pwd, (error, matches) => {
      if (error) return callback(error)
      callback(null, matches)
    })
  }
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('user')
  } catch (e) {
    Model = mongoose.model('user', UserSchema)
  }
  return Model
}
