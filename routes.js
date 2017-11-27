'use strict'
const cors = require('cors')
const csurf = require('csurf')
const authenticate = require('./lib/authenticate')
const passport = require('passport')
module.exports = function (app) {

  app.disable('x-powered-by')
  app.use(cors())
  app.set('trust proxy', 1)

  const marketing = require('./routes/marketing')
  app.use('/marketing', marketing)
  // /marketing/newsletter/join
  app.use('/', csurf({cookie: true}))
  // let authorize = require('./lib/authorization')
  app.use('/', function (req, res, next) {
    res.locals._csrfToken = req.csrfToken()
    // res.locals.user = {user: req.user}
    next()
  })
  const index = require('./routes/index')
  app.use('/', index)
  // const platform = require('./routes/platform')
  // app.use('/platform', authenticate, platform)
  const tokensale = require('./routes/tokensale')
  app.use('/token-sale', authenticate, tokensale)

  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

// error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

}