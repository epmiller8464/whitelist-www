'use strict'
let config = require('../config')
let mongoose = require('mongoose')
const {decrypt} = require('./crypto')
module.exports = function (cb) {
  mongoose.Promise = Promise
  let dbOptions = {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }

  mongoose.connect(decrypt(config.db.MONGO_DB_URI), dbOptions)
  .then((db) => {
    db.on('open', console.info.bind(console, 'connection open'))
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', (callback) => {console.log('open')})
    return cb(db)
  })
}
