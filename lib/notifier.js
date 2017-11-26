'use strict'

const EventEmitter = require('events').EventEmitter

class Notifier extends EventEmitter {
  constructor () {
    super()
  }

  subscribe (event, handler) {
    this.on(event, handler)
  }
}

let notifier
module.exports = function () {
  notifier = notifier || new Notifier()
  return notifier
}