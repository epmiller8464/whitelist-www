'use strict';

var path = require('path');
module.exports = function (app) {
  var layout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'layout';

  var exphbs = require('../helpers/handlebars')(layout);
  app.engine('hbs', exphbs.engine);
  app.set('views', path.join(process.env.PWD, 'views'));
  app.set('view engine', 'hbs');
  if (process.env.NODE_ENV === 'production') app.enable('view cache');
};
//# sourceMappingURL=views.js.map