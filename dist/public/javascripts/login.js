'use strict';

new Vue({
  el: '#login-form',
  data: function data() {
    return {
      email: '',
      csrf: '',
      pwd: ''
    };
  },
  methods: {
    onLogin: function onLogin(event) {
      if (!this.validate()) {
        return false;
      }
      $.ajax({
        method: 'POST',
        url: '/api/v1/auth/login',
        data: this.$data,
        dataType: 'json'
      }).done(function (data) {
        if (data.success) {
          window.location = '/platform';
        } else {
          $('#login-alert').addClass('alert-danger').children('.message').text(data.message);
        }
      }).fail(function (e) {
        if (e.responseJSON) {
          $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text(e.responseJSON.message);
        } else {
          $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('An error occurred please try again later.');
        }
      }).always(function () {
        this.$data.email = '';
        this.$data.pwd = '';
      });
      return false;
    },
    validate: function validate() {
      var regex = new RegExp(/.+\@.+\..+/);
      var email = this.$data.email;
      if (!email || !regex.test(email)) {
        $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('Please enter a valid e-mail address.');
        return false;
      }
      if (!this.$data.pwd || this.$data.pwd.length < 6) {
        $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('Password is not long enough.');
        return false;
      }
      return true;
    },
    clear: function clear() {
      this.$data.email = '';
      this.$data.pwd = '';
    }
  }
});
//# sourceMappingURL=login.js.map