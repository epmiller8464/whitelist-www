'use strict';

var encode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hex';
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var encrypted = '';
              var stream = fs.createReadStream(file);
              stream.on('data', function (chunk) {
                if (chunk) encrypted += chunk.toString(encoding);
              });
              stream.on('end', function () {
                resolve(encrypted);
              });
              stream.on('error', function (e) {
                reject(e);
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function encode(_x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');

module.exports = { encode: encode };
//# sourceMappingURL=encode.js.map