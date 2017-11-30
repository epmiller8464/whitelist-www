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
      var email = this.$data.email
      if (!this.validateEmail(email)) {
        $('#alert-label').removeClass('invisible').addClass('text-danger').text('Please enter a valid e-mail address.')
        return
      }
      console.log(this.$data)
      $.ajax({
        method: 'POST',
        url: '/api/v1/auth/login',
        data: this.$data,
        dataType: 'json'
      }).done(function (data) {
        // $('#login-alert').removeClass('invisible')
        if (data.success) {
          $('#login-alert').addClass('alert-danger').children('.message').text(data.message)
        } else {
          window.location = '/platform'
        }
        // $('#login-alert').addClass('alert-success').children('.message').text('Account created successfully, please check your email to confirm your account')
        //
        // } else {
        // }
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
    validateEmail: function (email) {
      var regex = new RegExp(/.+\@.+\..+/)
      if ((!email) || !regex.test(email)) {
        return false
      }
      return true
    }
  }
})