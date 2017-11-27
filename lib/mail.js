'use strict'
const sgMail = require('@sendgrid/mail')
const {buildUrl} = require('./utility')
// url.format()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

/**
 * @name Email {Email}
 */
class Email {
  /**
   * @name sendConfirmation Sends the confirmation email to a user
   * @param to {String} email address
   * @param name {String} name of the person receiving the email
   * @returns {Promise}
   */

  // x-session-token:87ae6159f16d47efb60b7408673726e7
  // x-user-id:9ab52cb2-d012-11e7-aaa7-3b535aee91ce

  static sendConfirmation ({id, to, token, name}) {
    console.log('sending confirmation email')
    let substitutions = {
      confirm_url: buildUrl(`verify/:id/?token=${token}`),
      name: name
    }
    return new Promise(function (resolve, reject) {
      sgMail.send({
        personalizations: [{
          to: [{
            email: to,
            name: name
          }],
          substitutionWrappers: ['{{', '}}'],
          substitutions: substitutions
        }],
        from: {email: process.env.NOREPLY_EMAIL, name: 'Swytch Team'},
        template_id: 'a05a4c7a-abec-433c-9434-ce837a8defbf',
        subject: '⚡⚡ Swytch Token - Verify Your Email ⚡⚡'
      }).then(resolve, reject)
    })
  }

  static sendNewsletterWelcomeEmail ({to, token}) {
    console.log('sending welcome email')
    let substitutions = {
      confirm_url: buildUrl(`marketing/newsletter/join`),
    }
    return new Promise(function (resolve, reject) {
      sgMail.send({
        personalizations: [{
          to: [{
            email: to
          }],
          substitutionWrappers: ['{{', '}}'],
          substitutions: substitutions
        }],
        from: {email: process.env.NOREPLY_EMAIL, name: 'Swytch Team'},
        template_id: '12226325-e3fe-45aa-a8ea-e9b33a7c5589',
        subject: '⚡⚡ Swytch Token - Welcome to our mailing list ⚡⚡'
      }).then(resolve, reject)
    })
  }
}

module.exports = {Email}
