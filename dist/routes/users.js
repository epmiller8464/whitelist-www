// 'use strict'
// let express = require('express')
// let router = express.Router()
// let validator = require('express-validator')
// const {User} = require('../lib/model')
// // configure an array of available methods per endpoint for pre-flight requests
// router.get('/me/logout', function (req, res, next) {
// // router.get('/me', authenticate, function (req, res, next) {
//   req.logOut()
//   req.user = null
//   req.session = null
//   res.locals = null
//   // res.clearCookie('lsr_token', {path: '/admin'})
//   res.redirect('/')
// })
//
// // CRUD for '/'
// router.get('/', function (req, res, next) {
//   try {
//     User.find((error, Users) => {
//       if (error) {
//         return next(error)
//       }
//       res.status(200).json(response(req, Users.map((o) => { return o.toObject() })))
//     })
//   } catch (e) {
//     return res.status(500).json(errorResponse('ServerError', e.toString()))
//   }
//
// })
//
// router.get('/:id', function (req, res, next) {
//   req.checkParams('id', 'user id needs to be alphanumeric').isAlphanumeric()
//
//   req.getValidationResult().then(function (result) {
//     if (!result.isEmpty()) {
//       let errors = result.array()
//       return res.send(errors)
//     }
//     else {
//       // continue normally and fetch user
//       try {
//         User.findById(req.params.id, (error, User) => {
//           if (error) {
//             return next(error)
//           }
//
//           if (User) {
//             return res.status(200).json(response(req, User.toObject()))
//           }
//           else {
//             return res.status(404).json({error: 'Not Found'})
//           }
//         })
//       } catch (e) {
//         return res.status(500).json(errorResponse('ServerError', e.toString()))
//       }
//     }
//   })
//
// })
//
// router.get('/:id/bots', function (req, res, next) {
//   req.checkParams('id', 'user id needs to be alphanumeric').isAlphanumeric()
//
//   req.getValidationResult().then(function (result) {
//     if (!result.isEmpty()) {
//       let errors = result.array()
//       return res.send(errors)
//     }
//     else {
//       try {
//         Bot.find({admins: {$in: [req.params.id]}}, function (error, Bots) {
//           if (error) {
//             return next(error)
//           }
//
//           res.status(200).json(response(req, Bots.map(function (o) { return o.toObject()})))
//         })
//
//       } catch (e) {
//         return res.status(500).json(errorResponse('ServerError', e.toString()))
//       }
//     }
//   })
//
// })
//
// router.post('/', function (req, res, next) {
//
//   req.checkBody('email', 'Enter valid email address').optional().isEmail()
//   req.checkBody('accessToken',
//     'Add accessToken when creating user').optional().isAlphanumeric()
//   req.checkBody('refreshToken',
//     'Add accessToken when creating user').optional().isAlphanumeric()
//   req.checkBody('date_added').optional().isDate()
//
//   req.sanitizeBody('email_verified').toBoolean()
//   req.sanitizeBody('name').trim()
//   req.sanitizeBody('accessToken').trim()
//   req.sanitizeBody('refreshToken').trim()
//
//   let emailOptions = {
//     all_lowercase: true,
//     gmail_remove_dots: false,
//
//   }
//   if (req.body['email']) {
//     req.sanitizeBody('email').normalizeEmail(emailOptions).trim()
//   }
//
//   if (req.body['date_added']) {
//     req.sanitizeBody('date_added').optional().toDate()
//   }
//
//   req.getValidationResult().then(result => {
//     if (!result.isEmpty()) {
//       let errors = result.array()
//       return res.send(errors)
//     }
//     else {
//       try {
//         User.create(req.body, (error, User) => {
//           if (error) {
//             return next(error)
//           }
//
//           return res.status(200).json(response(req, User.toObject()))
//         })
//
//       } catch (e) {
//         return res.status(500).json(errorResponse('ServerError', e.toString()))
//       }
//
//     }
//   })
//
// })
//
// router.put('/:id', function (req, res, next) {
//   req.checkParams('id', 'user id needs to be alphanumeric').isAlphanumeric()
//   req.checkBody('email', 'Enter valid email address').optional().isEmail()
//   req.checkBody('accessToken',
//     'Add accessToken when creating user').optional().isAlphanumeric()
//   req.checkBody('refreshToken',
//     'Add accessToken when creating user').optional().isAlphanumeric()
//   req.checkBody('date_added').optional().isDate()
//
//   req.sanitizeBody('email_verified').toBoolean()
//   req.sanitizeBody('name').trim()
//   req.sanitizeBody('accessToken').trim()
//   req.sanitizeBody('refreshToken').trim()
//   let emailOptions = {
//     all_lowercase: true,
//     gmail_remove_dots: false,
//
//   }
//
//   if (req.body['email']) {
//     req.sanitizeBody('email').normalizeEmail(emailOptions).trim()
//   }
//
//   if (req.body['date_added']) {
//     req.sanitizeBody('date_added').optional().toDate()
//   }
//
//   req.getValidationResult().then(result => {
//     if (!result.isEmpty()) {
//       let errors = result.array()
//       return res.send(errors)
//     }
//     else {
//       try {
//
//         User.findByIdAndUpdate(req.params.id, req.body, (error, User) => {
//           if (error) {
//             return next(error)
//           }
//
//           return res.status(200).json(response(req, User.toObject()))
//         })
//       } catch (e) {
//         return res.status(500).json(errorResponse('ServerError', e.toString()))
//       }
//
//     }
//   })
//
// })
//
// router.delete('/:id', function (req, res, next) {
//   req.checkParams('id', 'user id needs to be number and letters').isAlphanumeric()
//
//   req.getValidationResult().then(result => {
//     if (!result.isEmpty()) {
//       let errors = result.array()
//       return res.send(errors)
//     }
//     else {
//       try {
//         User.findByIdAndRemove(req.params.id, (error, User) => {
//           if (error) {
//             return next(error)
//           }
//
//           return res.status(200).json({message: 'deleted'})
//         })
//
//       } catch (e) {
//         return res.status(500).json(errorResponse('ServerError', e.toString()))
//       }
//     }
//
//   })
// })
//
// module.exports = router
"use strict";
//# sourceMappingURL=users.js.map