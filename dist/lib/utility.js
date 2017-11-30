'use strict';

var _require = require('url'),
    URL = _require.URL;

var buildUrl = function buildUrl(path) {
  var host = process.env.NODE_HOST;
  // path = path.replace('/', '')
  path.indexOf('/') === 0 ? path.substring(1) : path;
  return host + '/' + path;
};

module.exports = { buildUrl: buildUrl };
//# sourceMappingURL=utility.js.map