'use strict';

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = function (data) {
  return new Promise(function (resolve, reject) {
    sgMail.send({
      personalizations: [{
        to: [{
          email: data.to,
          name: data.name
        }],
        substitutionWrappers: ['{{', '}}'],
        substitutions: {
          email: data.to,
          discount: '10%',
          confirm_url: 'https://register.swytch.io/comfirm?email=' + data.to
        }
      }],
      from: { email: process.env.SWYTCH_EMAIL, name: 'Swytch Team' },
      template_id: 'a05a4c7a-abec-433c-9434-ce837a8defbf',
      subject: '⚡⚡Swytch Whitelist⚡⚡'
    }).then(resolve, reject);
  });
};
//# sourceMappingURL=mail.js.map