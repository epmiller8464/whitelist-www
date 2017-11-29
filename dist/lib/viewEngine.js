'use strict';

var viewConfig = function viewConfig(app) {

  app.engine('hbs', exphbs.engine);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.enable('view cache');
};
//# sourceMappingURL=viewEngine.js.map