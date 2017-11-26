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
  static sendConfirmation ({to, token}) {
    console.log('sending confirmation email')
    let substitutions = {
      confirm_url: buildUrl(`whitelist/confirmation?token=${token}`),
      discount: `${process.env.TGE_PERCENT_DISCOUNT}%`
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
        template_id: 'a05a4c7a-abec-433c-9434-ce837a8defbf',
        subject: '⚡⚡Swytch Whitelist⚡⚡'
      }).then(resolve, reject)
    })
  }
}

module.exports = {Email}
