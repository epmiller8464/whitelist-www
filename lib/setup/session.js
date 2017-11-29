'use strict'
const expressSession = require('express-session')

module.exports = (app) => {
  let sess = {
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true
  }
  // app.use(session({
  //   secret: process.env.APP_SECRET,
  //   resave: false,
  //   saveUninitialized: true
  // }))
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }

  app.use(expressSession(sess))
}
