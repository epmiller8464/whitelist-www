// 'use strict'
// const jwt = require('jsonwebtoken')
// const {User} = require('./model')
//
// const login = (req, res, next) => {
//   User.findOne({email: req.body.email}, (error, user) => {
//     if (error) {
//       return next(error)
//     }
//     if (!user) {
//       res.status(401).send({success: false, message: 'Authentication failed. User not found.'})
//     } else {
//       user.comparePassword(req.body.password, (error, matches) => {
//         if (matches && !error) {
//           const token = jwt.sign({user}, process.env.APP_SECRET)
//           res.json({success: true, message: 'Token granted', token})
//         } else {
//           res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'})
//         }
//       })
//     }
//   })
// }
//
// Api.verify = (headers) => {
//   if (headers && headers.authorization) {
//     const split = headers.authorization.split(' ')
//     if (split.length === 2) return split[1]
//     else return null
//   } else return null
// }
//
// module.exports = {}
