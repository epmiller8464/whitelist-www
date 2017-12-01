'use strict';

var _require = require('luxon'),
    DateTime = _require.DateTime;

var passwordValidator = require('password-validator');

var vue = new Vue({
  el: '#identity-form',
  data: function data() {
    return {
      country_code: '',
      csrf: '',
      crypto_type: '',
      first_name: '',
      last_name: '',
      us_citizen: false,
      purchase_amount: '',
      token: ''
    };
  },
  methods: {
    onWhitelist: function onWhitelist(event) {
      if (!this.validateForm()) {
        return;
      }
      var data = this.$data;
      data['g-recaptcha-response'] = this.$data.token;
      data.timeZone = DateTime.local();
      data._csrf = this.$data.csrf;
      $.ajax({
        method: 'POST',
        url: '/platform/token-sale',
        data: data,
        dataType: 'json'
      }).done(function (data) {
        if (data.success) {
          window.location = '/platform/token-sale';
        } else {
          $('#whitelist-alert').removeClass('invisible').addClass('alert-danger').children('.message').text(data.message);
        }
      }).fail(function (e) {
        if (e.responseJSON) {
          $('#whitelist-alert').removeClass('invisible').addClass('alert-danger').children('.message').text(e.responseJSON.message);
        } else {
          $('#whitelist-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('An error occurred please try again later.');
        }
      });
      return false;
    },
    validateForm: function validateForm() {
      $('.has-error').removeClass('has-error');
      var regex = new RegExp(/.+\@.+\..+/);
      var isValid = true;

      if (!this.$data.crypto_type) {
        $('input[name=crypto_type]').parents('.form-group').addClass('has-error');
        isValid = false;
      }
      if (this.$data.purchase_amount === 'null' || !this.$data.purchase_amount.length) {
        $('select[name=purchase_amount]').parent('.form-group').addClass('has-error');
        isValid = false;
      }
      return isValid;
    },
    recaptchaCallback: function recaptchaCallback(token) {
      // vm.token = null
      if (!this.validateForm()) {
        this.resetRecaptcha();
        return;
      }
      this.$data.token = token;
      $('#whitelistBtn').prop('disabled', false).removeClass('hide');
    },
    resetRecaptcha: function resetRecaptcha() {
      $('#whitelistBtn').prop('disabled', true).addClass('hide');
      grecaptcha.reset();
    },
    clearForm: function clearForm() {
      resetRecaptcha();
      this.$data.country_code = '';
      this.$data.csrf = '';
      this.$data.crypto_type = '';
      this.$data.first_name = '';
      this.$data.last_name = '';
      this.$data.us_citizen = false;
      this.$data.purchase_amount = '';
      this.$data.token = '';
      $('select[name=purchase_amount]').prop('selectedIndex', 0);
      $('input[name=crypto_type]:checked').prop('checked', false);
    },
    verified: function verified(token, cb) {
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
  }
});

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema.is().min(6) // Minimum length 8
.is().max(100) // Maximum length 100
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
.has().digits() // Must have digits
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

var registerForm = new Vue({
  el: '#signup-form',
  data: function data() {
    return {
      email: '',
      csrf: '{{csrfToken}}',
      first_name: '',
      last_name: '',
      confirm_pwd: '',
      pwd: ''
    };
  },
  methods: {
    onSubmit: function onSubmit(event) {
      // $('#signup-alert').removeClass('alert-danger').children('.message')
      var email = this.$data.email;
      if (!this.validateEmail(email)) {
        $('#signup-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('Please enter a valid e-mail address.');
        return;
      }

      if (this.$data.pwd !== this.$data.confirm_pwd) {
        $('#signup-alert').addClass('alert-danger').children('.message').text('Passwords do not match.');
        return;
      }

      var violations = schema.validate(this.$data.pwd, { list: true });

      if (violations.length) {
        var msg = 'Password requires: ' + violations.join(' ') + ' characters.';
        $('#signup-alert').addClass('alert-danger').children('.message').text(msg);
        return;
      }

      $.ajax({
        method: 'POST',
        url: '/api/v1/users/',
        data: this.$data,
        dataType: 'json'
      }).done(function (data) {
        if (data.success) {
          $('#signup-alert').addClass('alert-success').children('.message').text('Account created successfully, please check your email to confirm your account');
          setTimeout(function () {
            window.location = '/login';
          }, 3000);
        } else {
          $('#signup-alert').addClass('alert-danger').children('.message').text(data.message);
        }
      }).fail(function (e) {
        $('#signup-alert').removeClass('invisible').addClass('text-danger').text('An error occurred');
      }).always(function () {
        setTimeout(function () {
          $('#signup-alert').removeClass('alert-danger').removeClass('alert-success').children('.message').text('');
        }, 7000);
      });
      return false;
    },
    validateEmail: function validateEmail(email) {
      var regex = new RegExp(/.+\@.+\..+/);
      if (!email || !regex.test(email)) {
        return false;
      }
      return true;
    },
    clear: function clear() {
      this.$data.email = '';
      this.$data.csrf = '';
      this.$data.first_name = '';
      this.$data.last_name = '';
      this.$data.confirm_pwd = '';
      this.$data.pwd = '';
      $('#signup-alert').removeClass('alert-danger').removeClass('alert-success').children('.message').text('');
    }
  }
});

window.VueApp = window.VueApp || vue;
window.registerForm = window.registerForm || registerForm;
//# sourceMappingURL=app.js.map