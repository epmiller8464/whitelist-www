'use strict'
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')
const hbs = require('express-handlebars')
const requestHeaders = require('./lib/requestHeaders')
// const uuid = require('uuid')
// const session = require('express-session')
const sslRedirect = require('./lib/ssl-redirect')
const moment = require('moment')
const compression = require('compression')
const index = require('./routes/index')
const app = express()
app.use(compression())
app.use(sslRedirect(['test', 'production']))
requestHeaders(app)
app.disable('x-powered-by')
// view engine setup
var exphbs = hbs.create({
  extname: 'hbs', defaultLayout: 'layout', helpers: {
    section: function (name, options) {
      if (!this._sections) {
        this._sections = {}
      }
      this._sections[name] = options.fn(this)
      return null
    },
    increment: function (index) {
      return index + 1
    },
    formatDate: function (date) {
      return moment(date).format('L')

    },
    formatDateTime: function (date) {
      return moment(date).format('LLL')

    },
    printCode: function (code) {
      return JSON.stringify(code, null, 2)
    },
    ifCond: function (v1, operator, v2, options) {

      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this)
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this)
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this)
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this)
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this)
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this)
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this)
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this)
        default:
          return options.inverse(this)
      }
    },
    printYesOrNo: function (isTrue) {
      return (isTrue) ? 'Yes' : 'No'
    }
  }
})
// view engine setup
app.engine('hbs', exphbs.engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.set('trust proxy', 1)

app.use(require('cors')({
  origin: '*',
  methods: 'GET,POST',
  preflightContinue: true
  // headers: ['Access-Control-Allow-Origin']
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser(process.env.APP_SECRET))
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', index)
require('./lib/db')(() => {})

// catch 404 and forward to error handler
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

module.exports = app
