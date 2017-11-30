'use strict';
'use strict';

var _require = require('./onboard'),
    onBoard = _require.onBoard,
    confirmEmail = _require.confirmEmail;

var notifier = require('./notifier');
var notify = void 0;
module.exports = function () {
  if (!notify) {
    notify = notifier();
    notify.subscribe('whitelist', onBoard);
    notify.subscribe('confirm:email', confirmEmail);
    notify.subscribe('resend:email', confirmEmail);
  }
  return notify;
};
//# sourceMappingURL=events.js.map