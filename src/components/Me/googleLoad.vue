<template>
  <div id="google-signin-button"></div>
</template>

<script>
export default {
  mounted() {
    gapi.load('auth2', function() {})
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      // scope: 'email',
      width: 200,
      height: 50,
      longtitle: false,
      theme: 'dark'
    })
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile()
      console.log('ID: ' + profile.getId()) // 不能直接发送至服务器 Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // The ID token you need to pass to your backend:
      var id_token = user.getAuthResponse().id_token
      console.log('ID Token: ' + id_token)
    }
  }
}
</script>
<style lang="less">
#google-signin-button {
  opacity: 0;
}
.abcRioButtonContents {
  vertical-align: text-top !important;
}
</style>

