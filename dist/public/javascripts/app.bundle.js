'use strict';

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  // const geoip = require('geoip-lite')

  var publicIp = __webpack_require__(1);

  function geoLocate(cb) {
    publicIp.v4().then(function (ip) {
      return cb(ip);
    }).catch(function (e) {
      console.error(e);
    });
  }

  var App = {
    geoLocate: geoLocate,
    validate: function validate() {
      $('.has-error').removeClass('has-error');
      var firstName = $('input[name=firstName]').val();
      var lastName = $('input[name=lastName]').val();
      var email = $('input[name=email]').val();
      var confirmEmail = $('input[name=confirm-email]').val();
      var regex = new RegExp(/.+\@.+\..+/);

      firstName = firstName && firstName.length > 0 ? firstName.trim() : null;
      lastName = lastName && lastName.length > 0 ? lastName.trim() : null;
      email = email && email.length > 0 ? email.trim() : null;
      confirmEmail = confirmEmail && confirmEmail.length > 0 ? confirmEmail.trim() : null;
      if (!firstName || firstName.length < 2) {
        $('input[name=firstName]').parent('.form-group').addClass('has-error');
        return false;
      }

      if (!lastName || lastName.length < 2) {
        $('input[name=lastName]').parent('.form-group').addClass('has-error');
        return false;
      }
      if (!email || !regex.test(email)) {
        $('input[name=email]').parent('.form-group').addClass('has-error');
        return false;
      }
      if (!regex.test(confirmEmail)) {
        $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
        return false;
      }
      if (email !== confirmEmail) {
        $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
        return false;
      }
      return true;
    },
    submit: function submit() {
      if (this.validate()) {
        alert('ready');
      }
    }
  };
  window.App = window.App || App;
  module.exports = App;

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var isIp = __webpack_require__(2);

  var defaults = {
    timeout: 5000
  };

  var urls = {
    v4: 'https://ipv4.icanhazip.com/',
    v6: 'https://ipv6.icanhazip.com/'
  };

  function queryHttps(version, opts) {
    return new Promise(function (resolve, reject) {
      var doReject = function doReject() {
        return reject(new Error('Couldn\'t find your IP'));
      };
      var xhr = new XMLHttpRequest();

      xhr.onerror = doReject;
      xhr.ontimeout = doReject;
      xhr.onload = function () {
        var ip = xhr.responseText.trim();

        if (!ip || !isIp[version](ip)) {
          doReject();
        }

        resolve(ip);
      };

      xhr.open('GET', urls[version]);
      xhr.timeout = opts.timeout;
      xhr.send();
    });
  }

  module.exports.v4 = function (opts) {
    opts = Object.assign({}, defaults, opts);
    return queryHttps('v4', opts);
  };

  module.exports.v6 = function (opts) {
    opts = Object.assign({}, defaults, opts);
    return queryHttps('v6', opts);
  };

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var ipRegex = __webpack_require__(3);

  var isIp = module.exports = function (x) {
    return ipRegex({ exact: true }).test(x);
  };
  isIp.v4 = function (x) {
    return ipRegex.v4({ exact: true }).test(x);
  };
  isIp.v6 = function (x) {
    return ipRegex.v6({ exact: true }).test(x);
  };

  /***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var v4 = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';

  var v6seg = '[0-9a-fA-F]{1,4}';
  var v6 = ('\n(\n(?:' + v6seg + ':){7}(?:' + v6seg + '|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:' + v6seg + ':){6}(?:' + v4 + '|:' + v6seg + '|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:' + v6seg + ':){5}(?::' + v4 + '|(:' + v6seg + '){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:' + v6seg + ':){4}(?:(:' + v6seg + '){0,1}:' + v4 + '|(:' + v6seg + '){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:' + v6seg + ':){3}(?:(:' + v6seg + '){0,2}:' + v4 + '|(:' + v6seg + '){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:' + v6seg + ':){2}(?:(:' + v6seg + '){0,3}:' + v4 + '|(:' + v6seg + '){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:' + v6seg + ':){1}(?:(:' + v6seg + '){0,4}:' + v4 + '|(:' + v6seg + '){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::' + v6seg + '){0,5}:' + v4 + '|(?::' + v6seg + '){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n').replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

  var ip = module.exports = function (opts) {
    return opts && opts.exact ? new RegExp('(?:^' + v4 + '$)|(?:^' + v6 + '$)') : new RegExp('(?:' + v4 + ')|(?:' + v6 + ')', 'g');
  };

  ip.v4 = function (opts) {
    return opts && opts.exact ? new RegExp('^' + v4 + '$') : new RegExp(v4, 'g');
  };
  ip.v6 = function (opts) {
    return opts && opts.exact ? new RegExp('^' + v6 + '$') : new RegExp(v6, 'g');
  };

  /***/
}]);
//# sourceMappingURL=app.bundle.js.map
//# sourceMappingURL=app.bundle.js.map