'use strict'
var mongoose = require('mongoose')

module.exports = function () {
  // {
  //   "logName": string,
  //   "resource": {
  //   object(MonitoredResource)
  // },
  //   "timestamp": string,
  //   "receiveTimestamp": string,
  //   "severity": enum(LogSeverity),
  //   "insertId": string,
  //   "httpRequest": {
  //   object(HttpRequest)
  // },
  //   "labels": {
  //   string: string,
  // ...
  // },
  //   "operation": {
  //   object(LogEntryOperation)
  // },
  //   "trace": string,
  //   "sourceLocation": {
  //   object(LogEntrySourceLocation)
  // },
  //
  //   // Union field payload can be only one of the following:
  //   "protoPayload": {
  //   "@type": string,
  //     field1: ...,
  // ...
  // },
  //   "textPayload": string,
  //   "jsonPayload": {
  //   object
  // },
  //   // End of list of possible types for union field payload.
  // }

  var LogSchema = new mongoose.Schema({
    pid: String,
    hostname: String,
    level: Number,
    msg: String,
    time: Number,
    status: Number,
    req: {
      method: String,
      url: String,
      headers: {
        host: String,
        connection: String
      },
      remoteAddress: String,
      remotePort: Number
    },
    payload: mongoose.Schema.Types.Object
  }, {capped: (5242880 * 3)}, {collection: 'log'})

  let Model
  try {
    // Throws an error if "Name" hasn't been registered
    Model = mongoose.model('log')
  } catch (e) {
    Model = mongoose.model('log', LogSchema)
  }
  return Model

}