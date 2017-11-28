'use strict'

const hbs = require('express-handlebars')
const moment = require('moment')
module.exports = function (layout = 'layout') {
  return hbs.create({
    extname: 'hbs',
    defaultLayout: layout,
    helpers: {
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
}