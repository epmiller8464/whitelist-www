'use strict'
const fs = require('fs')

async function encode (file, encoding = 'hex') {
  return new Promise(function (resolve, reject) {
    let encrypted = ''
    let stream = fs.createReadStream(file)
    stream.on('data', (chunk) => {
      if (chunk)
        encrypted += chunk.toString(encoding)
    })
    stream.on('end', () => {
      resolve(encrypted)
    })
    stream.on('error', (e) => {
      reject(e)
    })
  })
}

module.exports = {encode}