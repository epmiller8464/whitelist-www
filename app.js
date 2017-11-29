'use strict'
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')
const requestHeaders = require('./lib/requestHeaders')
const sslRedirect = require('./lib/ssl-redirect')
const passport = require('passport')
const compression = require('compression')
const session = require('./lib/setup/session')
const viewConfig = require('./lib/setup/views')
const app = express()
app.use(compression())
app.use(sslRedirect(['test', 'production']))
requestHeaders(app)
app.disable('x-powered-by')
// view engine setup
viewConfig(app)
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'))
app.set('secret', process.env.APP_SECRET)
require('./lib/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

session(app)


app.use(cookieParser(process.env.APP_SECRET))
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

require('./routes')(app)
require('./lib/db')(() => {})
require('./lib/events')()

module.exports = app
