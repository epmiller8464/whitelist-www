'use strict'
'use strict'

const {onBoard, confirmEmail} = require('./onboard')
const notifier = require('./notifier')
let notify
module.exports = function () {
  if (!notify) {
    notify = notifier()
    notify.subscribe('onboard', onBoard)
    notify.subscribe('confirm:email', confirmEmail)
  }
  return notify
}
