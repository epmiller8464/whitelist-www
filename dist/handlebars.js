'use strict';

var hbs = require('express-handlebars');
var moment = require('moment');
module.exports = function () {
  return hbs.create({
    extname: 'hbs', defaultLayout: 'layout', helpers: {
      section: function section(name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      },
      increment: function increment(index) {
        return index + 1;
      },
      formatDate: function formatDate(date) {
        return moment(date).format('L');
      },
      formatDateTime: function formatDateTime(date) {
        return moment(date).format('LLL');
      },
      printCode: function printCode(code) {
        return JSON.stringify(code, null, 2);
      },
      ifCond: function ifCond(v1, operator, v2, options) {

        switch (operator) {
          case '==':
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case '===':
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case '<':
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case '<=':
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case '>':
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case '>=':
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          case '&&':
            return v1 && v2 ? options.fn(this) : options.inverse(this);
          case '||':
            return v1 || v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
      printYesOrNo: function printYesOrNo(isTrue) {
        return isTrue ? 'Yes' : 'No';
      }
    }
  });
};
//# sourceMappingURL=handlebars.js.map