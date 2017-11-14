'use strict';

var publicIp = require('public-ip');

var App = {
  geoLocate: function geoLocate(cb) {
    publicIp.v4().then(function (ip) {
      return cb(null, ip);
    }).catch(function (e) {
      return cb(e, null);
    });
  },
  validate: function validate() {
    $('.has-error').removeClass('has-error');
    var firstName = $('input[name=firstName]').val(),
        lastName = $('input[name=lastName]').val(),
        email = $('input[name=email]').val(),
        confirmEmail = $('input[name=confirm-email]').val(),
        regex = new RegExp(/.+\@.+\..+/),
        isValid = true;

    firstName = firstName && firstName.length > 0 ? firstName.trim() : null;
    lastName = lastName && lastName.length > 0 ? lastName.trim() : null;
    email = email && email.length > 0 ? email.trim() : null;
    confirmEmail = confirmEmail && confirmEmail.length > 0 ? confirmEmail.trim() : null;
    if (!firstName || firstName.length < 2) {
      $('input[name=firstName]').parent('.form-group').addClass('has-error');
      isValid = false;
    }

    if (!lastName || lastName.length < 2) {
      $('input[name=lastName]').parent('.form-group').addClass('has-error');
      isValid = false;
    }
    if (!email || !regex.test(email)) {
      $('input[name=email]').parent('.form-group').addClass('has-error');
      isValid = false;
    }
    if (!regex.test(confirmEmail)) {
      $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
      isValid = false;
    }
    if (email !== confirmEmail) {
      $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
      isValid = false;
    }
    return isValid;
  },
  submit: function submit() {
    if (this.validate()) {
      // alert('ready')
      $('body').addClass('loading');
    } else {}
  }
};
window.App = window.App || App;
module.exports = App;
//# sourceMappingURL=app.js.map