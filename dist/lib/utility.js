'use strict';

var _require = require('url'),
    URL = _require.URL;

var buildUrl = function buildUrl(path) {
  var protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  var host = process.env.NODE_HOST;
  path = path.replace('/', '');
  return protocol + '://' + host + '/' + path;
};

module.exports = { buildUrl: buildUrl };
//# sourceMappingURL=utility.js.map