'use strict'
const crypt = require('crypto')
const nets = require('nets')
const API_ROOT = 'https://keybase.io/_/api/1.0'

const API_ROUTES = {
  SIGNUP: 'signup.json',
  GETSALT: 'getsalt.json',
  LOGIN: 'login.json'
}

class SignUp {
  constructor () {
    let self = this
    self.name = 'Chris'
    self.email = 'cc@chriscoyne.com'
    self.username = 'chris'
    self.pwh = 'f0909fe23409...'
    self.salt = '7d34343eeeee...'
    self.invitation_id = '0000000000123'
  }
}

const getSalt = (user, cb) => {
  let params = {email_or_username: 'chris_swytch_pgp'}
  let request = {
    url: `${API_ROOT}/${API_ROUTES.GETSALT}`,
    method: 'POST',
    encoding: undefined,
    body: JSON.stringify(params)
  }
  nets(request, (err, res, body) => {
    return cb(err, JSON.parse(body))
  })
}

