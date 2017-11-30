'use strict'
const {URL} = require('url')
const buildUrl = (path) => {
  let host = process.env.NODE_HOST
  // path = path.replace('/', '')
  path.indexOf('/') === 0 ? path.substring(1) : path
  return `${host}/${path}`
}

module.exports = {buildUrl}