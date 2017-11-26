'use strict';

var publicIp = require('public-ip');
var Alert = require('./vanishingAlert');

var _require = require('luxon'),
    DateTime = _require.DateTime;

var vm = { token: null };

function resetRecaptcha() {
  $('#submit').prop('disabled', true);
  $('#submit').addClass('hide');
  vm.token = null;
  grecaptcha.reset();
}

function clearForm() {
  resetRecaptcha();
  $('.has-error').removeClass('has-error');
  $('input[name=email]').val('');
  $('select[name=purchaseAmount]').prop('selectedIndex', 0);
  $('input[name=cryptoType]:checked').prop('checked', false);
}

function verified(token, cb) {
  var _token = token;
  var data = $('#whitelist-form').serializeArray();
  var hasError = false;
  var json = {};
  for (var i = 0; i < data.length; i++) {
    if (!data[i].value) {
      $('#whitelist-form').addClass('has-error');
      hasError = true;
    } else {
      if (data[i].name === 'g-recaptcha-response') {
        hasError = data[i].value !== _token;
      }
    }
    json[data[i].name] = data[i].value;
  }

  if (hasError) {
    return cb(new Error('validation failed'));
  }
  return cb(null, data);
}

var App = {
  geoLocate: function geoLocate(cb) {
    publicIp.v4().then(function (ip) {
      return cb(null, ip);
    }).catch(function (e) {
      return cb(e, null);
    });
  },
  validateForm: function validateForm() {
    $('.has-error').removeClass('has-error');
    var email = $('input[name=email]').val(),
        amount = $('select[name=purchaseAmount]').val(),
        cryptoCurrency = $('input[name=cryptoType]:checked').val(),
        regex = new RegExp(/.+\@.+\..+/),
        isValid = true;

    email = email && email.length > 0 ? email.trim() : null;
    cryptoCurrency = cryptoCurrency && cryptoCurrency.length > 0 ? cryptoCurrency.trim() : null;

    if (!email || !regex.test(email)) {
      $('input[name=email]').parent('.form-group').addClass('has-error');
      isValid = false;
    }

    if (!cryptoCurrency) {
      $('input[name=cryptoType]').parents('.form-group').addClass('has-error');
      isValid = false;
    }
    if (amount === 'null') {
      $('select[name=purchaseAmount]').parent('.form-group').addClass('has-error');
      isValid = false;
    }
    return isValid;
  },
  submit: function submit() {
    if (!App.validateForm() || !vm.token) {
      // alert('ready')
      resetRecaptcha();
      return false;
    }
    try {
      verified(vm.token, function (err, data) {
        if (err) {
          vm.token = null;
          resetRecaptcha();
          return false;
        } else {
          $('body').addClass('loading');
          // $('#submit').prop('disabled', true)
          var dt = DateTime.local();

          $.ajax({
            method: 'POST',
            url: '/whitelist',
            data: data
          }).done(function (result) {
            var data = {
              css: 'alert-success',
              targetId: 'alert',
              message: 'Congrats you have been added to the Swytch Whitelist.'
            };
            if (result.error) {
              data.message = 'alert-danger';
              data.message = result.error;
            }
            Alert(data);
          }).fail(function (e) {
            console.error('Submission error');
            Alert({
              css: 'alert-danger',
              targetId: 'alert',
              message: 'Opps, something went wrong and we are working to resolve the issue'
            });
          }).always(function () {
            $('body').removeClass('loading');
            clearForm();
          });
        }
      });
    } catch (e) {
      console.error('Unhandled Exception');
      Alert({});
      return false;
    }
    return false;
  },
  recaptchaCallback: function recaptchaCallback(token) {
    // vm.token = null
    if (!App.validateForm()) {
      resetRecaptcha();
      return;
    }
    vm.token = token;
    $('#submit').prop('disabled', false);
    $('#submit').removeClass('hide');
  },
  Alert: Alert
};
window.App = window.App || App;
module.exports = App;
//# sourceMappingURL=app.js.map