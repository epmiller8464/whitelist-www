'use strict';
// const geoip = require('geoip-lite')

var publicIp = require('public-ip');

function geoLocate(cb) {
  publicIp.v4().then(function (ip) {
    return cb(ip);
  }).catch(function (e) {
    console.error(e);
  });
}

var App = {
  geoLocate: geoLocate,
  validate: function validate() {
    $('.has-error').removeClass('has-error');
    var firstName = $('input[name=firstName]').val();
    var lastName = $('input[name=lastName]').val();
    var email = $('input[name=email]').val();
    var confirmEmail = $('input[name=confirm-email]').val();
    var regex = new RegExp(/.+\@.+\..+/);

    firstName = firstName && firstName.length > 0 ? firstName.trim() : null;
    lastName = lastName && lastName.length > 0 ? lastName.trim() : null;
    email = email && email.length > 0 ? email.trim() : null;
    confirmEmail = confirmEmail && confirmEmail.length > 0 ? confirmEmail.trim() : null;
    if (!firstName || firstName.length < 2) {
      $('input[name=firstName]').parent('.form-group').addClass('has-error');
      return false;
    }

    if (!lastName || lastName.length < 2) {
      $('input[name=lastName]').parent('.form-group').addClass('has-error');
      return false;
    }
    if (!email || !regex.test(email)) {
      $('input[name=email]').parent('.form-group').addClass('has-error');
      return false;
    }
    if (!regex.test(confirmEmail)) {
      $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
      return false;
    }
    if (email !== confirmEmail) {
      $('input[name=confirm-email]').parent('.form-group').addClass('has-error');
      return false;
    }
    return true;
  },
  submit: function submit() {
    if (this.validate()) {
      alert('ready');
    }
  }
};
window.App = window.App || App;
module.exports = App;
//# sourceMappingURL=app.js.map