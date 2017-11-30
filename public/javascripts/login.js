'use strict'

new Vue({
  el: '#login-form',
  data: function () {
    return {
      email: 'epmiller8464@gmail.com',
      csrf: '',
      pwd: ''
    }
  },
  methods: {
    onLogin: function (event) {
      if (!this.validate()) {
        return false
      }
      $.ajax({
        method: 'POST',
        url: '/api/v1/auth/login',
        data: this.$data,
        dataType: 'json'
      }).done(function (data) {
        if (data.success) {
          window.location = '/platform'
        } else {
          $('#login-alert').addClass('alert-danger').children('.message').text(data.message)
        }
      }).fail(function (e) {
        if (e.responseJSON) {
          $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text(e.responseJSON.message)
        } else {
          $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('An error occurred please try again later.')
        }

      }).always(function () {
        setTimeout(function () {
          $('#alert-label').addClass('invisible').removeClass('text-danger').text('')
        }, 5000)
      })
      return false
    },
    validate: function () {
      var regex = new RegExp(/.+\@.+\..+/)
      var email = this.$data.email
      if ((!email) || !regex.test(email)) {
        $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('Please enter a valid e-mail address.')
        return false
      }
      if ((!this.$data.pwd) || this.$data.pwd.length < 6) {
        $('#login-alert').removeClass('invisible').addClass('alert-danger').children('.message').text('Password is not long enough.')
        return false
      }
      return true
    }
  }
})