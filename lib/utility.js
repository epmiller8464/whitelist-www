'use strict'
const {URL} = require('url')
const buildUrl = (path) => {
  let protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  let host = process.env.NODE_HOST
  path = path.replace('/', '')
  return `${protocol}://${host}/${path}`
}

module.exports = {buildUrl}