'use strict'
const path = require('path')
module.exports = (app, layout = 'layout') => {
  const exphbs = require('../helpers/handlebars')(layout)
  app.engine('hbs', exphbs.engine)
  app.set('views', path.join(process.env.PWD, 'views'))
  app.set('view engine', 'hbs')
  if (process.env.NODE_ENV === 'production')
    app.enable('view cache')
}
