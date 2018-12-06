<template>
  <div v-title="$route.meta.title">
    <button @click="login('facebook')">facebook登录</button>
    <!-- <button @click="login('google')">google登录</button> -->
  </div>
</template>

<script>
import hello from "hellojs/dist/hello.all";
// import facebookLogin from "facebook-login-vuejs";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    hello.init(
      {
        facebook: "764171083944070"
      },
      {
        redirect_uri: "/facebookLoad"
      }
    );
  },
  methods: {
    // 登录操作
    login(network) {
      let self = this;
      let provider = hello(network);
      provider.login().then(
        res => {
          provider.api("me").then(r => {
            alert(r.name);
            console.log(r.name);
          });
          console.log(res);
        },
        error => {
          console.log(error);
          alert("Signin error: " + e.error.message);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
</style>

