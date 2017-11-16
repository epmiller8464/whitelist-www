'use strict';

var config = require('../config');
var mongoose = require('mongoose');

module.exports = function (cb) {
  mongoose.Promise = Promise;
  var dbOptions = {
    useMongoClient: true,
    promiseLibrary: global.Promise
  };

  mongoose.connect(config.db.MONGO_DB_URI, dbOptions).then(function (db) {
    db.on('open', console.info.bind(console, 'connection open'));
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function (callback) {
      console.log('open');
    });
    // process.on('SIGINT', () => {
    //   db.close(() => {
    //     console.log('process terminated, connection closed')
    //     process.exit(0)
    //   })
    // })
    return cb(db);
  });
};
// module.exports = (mongoose, config) => {
//   const database = mongoose.connection
//   mongoose.Promise = Promise
//   mongoose.connect(config.database, {
//     useMongoClient: true,
//     promiseLibrary: global.Promise
//   })
//   database.on('error', error => console.log(`Connection to database failed: ${error}`))
//   database.on('connected', () => console.log('Connected to database'))
//   database.on('disconnected', () => console.log('Disconnected from database'))
//   process.on('SIGINT', () => {
//     database.close(() => {
//       console.log('process terminated, connection closed')
//       process.exit(0)
//     })
//   })
// }
//# sourceMappingURL=db.js.map