'use strict'
const jwt = require('jsonwebtoken')
const {User} = require('./model')
const login = (req, res, next) => {
  User.findOne({email: req.body.email}, (error, user) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      res.status(401).json({success: false, message: 'Unauthorized'})
    } else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          let jwtOpts = {
            expiresIn: `1d`
          }
          const token = jwt.sign({user}, process.env.APP_SECRET, jwtOpts)

          res.json({success: true})
        } else {
          next(new Error('Unauthorized'))
          res.status(401).json({success: false, message: 'Authentication failed. Wrong password.'})
        }
      })
    }
  })
}

module.exports = {login}
