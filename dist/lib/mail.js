'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sgMail = require('@sendgrid/mail');

var _require = require('./utility'),
    buildUrl = _require.buildUrl;
// url.format()


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @name Email {Email}
 */

var Email = function () {
  function Email() {
    _classCallCheck(this, Email);
  }

  _createClass(Email, null, [{
    key: 'sendConfirmation',

    /**
     * @name sendConfirmation Sends the confirmation email to a user
     * @param to {String} email address
     * @param name {String} name of the person receiving the email
     * @returns {Promise}
     */
    value: function sendConfirmation(_ref) {
      var to = _ref.to,
          token = _ref.token;

      console.log('sending confirmation email');
      var substitutions = {
        confirm_url: buildUrl('whitelist/confirmation?token=' + token),
        discount: process.env.TGE_PERCENT_DISCOUNT + '%'
      };
      return new Promise(function (resolve, reject) {
        sgMail.send({
          personalizations: [{
            to: [{
              email: to
            }],
            substitutionWrappers: ['{{', '}}'],
            substitutions: substitutions
          }],
          from: { email: process.env.NOREPLY_EMAIL, name: 'Swytch Team' },
          template_id: 'a05a4c7a-abec-433c-9434-ce837a8defbf',
          subject: '⚡⚡Swytch Whitelist⚡⚡'
        }).then(resolve, reject);
      });
    }
  }]);

  return Email;
}();

module.exports = { Email: Email };
//# sourceMappingURL=mail.js.map