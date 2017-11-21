'use strict';

var config = require('../config');
var mongoose = require('mongoose');

var _require = require('./crypto'),
    decrypt = _require.decrypt;

module.exports = function (cb) {
  mongoose.Promise = Promise;
  var dbOptions = {
    useMongoClient: true,
    promiseLibrary: global.Promise
  };

  mongoose.connect(decrypt(process.env.MONGODB_URI), dbOptions).then(function (db) {
    db.on('open', console.info.bind(console, 'connection open'));
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function (callback) {
      console.log('open');
    });
    return cb(db);
  });
};
//# sourceMappingURL=db.js.map