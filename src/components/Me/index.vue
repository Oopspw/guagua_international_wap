<template>
  <div v-title="$route.meta.title">
    <v-head></v-head>
    <div class="userBox">
      <!-- 未登录状态 -->
      <div class="isNotload">
        <div class="imgBox">
          <img src="../../assets/images/icon.png">
        </div>
        <div class="loadBox">
          <h3 class="title">Choose Login Method</h3>
          <div class="loadbox">
            <div class="facebook">
              <img src="../../assets/images/My/Facebook@2x.png">
            </div>
            <div class="google">
              <img src="../../assets/images/My/Google@2x.png">
              <div id="google-signin-button"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 登录状态 -->
      <div class="isLoad"></div>
    </div>
    <div class="menu">
      <ul class="menuUl">
        <li class="menuLi" v-for="item in menuList" @click="choosePage(item.menucode)">
          <div class="imgBox" v-if="item.menuicon !== ''">
            <img :src="item.menuicon">
          </div>
          <div :class="item.menuicon !== ''?'contentBox':'content'">
            {{ item.menuname }}
            <!-- 描述 -->
            <h3
              class="tipContent"
              v-if="item.menuintro !== ''"
              :style="{'color': '#'+item.fontstyle}"
            >{{ item.menuintro }}</h3>
            <img
              class="arrow"
              v-if="item.menuintro === ''&&item.menuicon !== ''"
              src="../../assets/images/right@2x.png"
            >
          </div>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import head from "../Modules/head";
import footer from "../Modules/footer";
export default {
  name: "userIndex",
  data() {
    return {
      url: window.config.api.wapUrl,
      Infversion: window.config.api.Infversion,
      menuList: []
    };
  },
  components: {
    vHead: head,
    vFooter: footer
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = "userIndex";
    // 判断是否有缓存的列表数据 如果有则使用缓存 否则调用接口访问
    this.getMyInfo();
    if (sessionStorage.menuList !== undefined) {
      this.menuList = JSON.parse(sessionStorage.menuList);
      console.log(this.menuList);
    } else {
      this.getMyPageMenu();
    }
    // 渲染
    gapi.load("auth2", function() {});
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  methods: {
    // 谷歌登录获取数据
    onSignIn(user) {
      const profile = user.getBasicProfile();
      // 客户端需要用到的数据
      // Useful data for your client-side scripts:
      console.log("ID: " + profile.getId()); // 不能直接发送至服务器 Don't send this directly to your server!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = user.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
    getMyPageMenu() {
      let url = this.url;
      let data = {
        isexamine: "3",
        userid: "335453",
        appv: "1.0",
        i18n: this.$store.state.langType,
        UID: "1542770516349",
        Infversion: "1.0",
        Method: "GetMyPageMenu",
        Key: "oRP2KNBzS6/eHUzrHl29T7z4zRnqZLBPbzn2gcrOMrCJ2LtbX5agPA=="
      };
      // let datas = JSON.stringify(data)
      // console.log(datas)
      // this.$axios
      //   .post(this.url, JSON.stringify(data), {
      //     timeout: 60 * 1000
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     let str = error + ''
      //     if (str.search('timeout') !== -1) {
      //       // 超时error捕获
      //       console.log('网络连接超时，请重试！')
      //     }
      //   })
      this.$apiPost(
        url,
        data,
        res => {
          console.log(res);
          this.menuList = res.data;
          // 将菜单列表进行缓存
          sessionStorage.menuList = JSON.stringify(res.data);
        },
        err => {
          console.log(err);
        }
      );
    },
    getMyInfo() {
      let url = this.url;
      let data = {
        isexamine: "3",
        userid: "335453",
        appv: "1.0",
        i18n: this.$store.state.langType,
        UID: "1542770516349",
        Infversion: "1.0",
        Method: "GetMyInfo",
        Key: "oRP2KNBzS6/eHUzrHl29T7z4zRnqZLBPbzn2gcrOMrCJ2LtbX5agPA=="
      };
      let datas = JSON.stringify(data);
      // this.$axios
      //   .post(this.url, JSON.stringify(data), {
      //     timeout: 60 * 1000
      //   })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     let str = error + ''
      //     if (str.search('timeout') !== -1) {
      //       // 超时error捕获
      //       console.log('网络连接超时，请重试！')
      //     }
      //   })
      this.$apiPost(
        url,
        data,
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    },
    renderButton() {},
    choosePage(page) {
      if (page === "app_h5_interinvitationcode") {
        this.$router.push({ path: "/inviteCode" });
      } else if (page === "") {
      } else if (page === "app_aboutsharemoney") {
        this.$router.push({ path: "/aboutUs" });
      }
    }
  }
};
</script>

<style lang="less">
.userIndex {
  padding: 0;
  background: #f0eff5;
}
.userBox {
  width: 100vw;
  padding: 0 0.42rem;
  background: #ffffff;
  .isNotload {
    width: 100%;
    height: 2.17rem;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    .imgBox {
      width: 1.48rem;
      height: 2.17rem;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        width: 1.22rem;
        height: 1.22rem;
        border-radius: 50%;
      }
    }
    .loadBox {
      width: 100%;
      height: 2.17rem;
      padding-top: 0.45rem;
      padding-left: 0.3rem;
      .title {
        width: 100%;
        font-size: 0.3rem;
        text-align: center;
        position: relative;
      }
      .title::before {
        content: "";
        position: absolute;
        width: 0.35rem;
        height: 1px;
        border-bottom: 1px dashed #bbbbbb;
        top: 50%;
        left: 0.1rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
      }
      .title::after {
        content: "";
        position: absolute;
        width: 0.35rem;
        height: 1px;
        border-bottom: 1px dashed #bbbbbb;
        top: 50%;
        right: 0.1rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
      }
      .loadbox {
        width: 100%;
        padding-top: 0.3rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        .facebook {
          width: 50%;
          position: relative;
          img {
            height: 0.66rem;
            width: 0.66rem;
            float: right;
            margin-right: 0.6rem;
          }
        }
        .google {
          width: 50%;
          position: relative;
          img {
            height: 0.66rem;
            width: 0.66rem;
            float: left;
            margin-left: 0.6rem;
          }
        }
      }
    }
  }
}
.menu {
  width: 100vw;
  background: #ffffff;
  margin-top: 0.2rem;
  .menuUl {
    width: 100%;
    .menuLi {
      width: 100%;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      .imgBox {
        width: 13%;
        height: 1.13rem;
        position: relative;
        img {
          position: absolute;
          width: 0.43rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
      }
      .contentBox {
        width: 87%;
        height: 1.13rem;
        font-size: 0.28rem;
        line-height: 1.13rem;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        .tipContent {
          position: absolute;
          text-align: end;
          padding-right: 0.28rem;
          height: 1.13rem;
          font-size: 0.28rem;
          line-height: 1.13rem;
          right: 0;
          top: 0;
        }
        .arrow {
          position: absolute;
          height: 0.3rem;
          top: 50%;
          right: 0.3rem;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
        }
      }
      .content {
        width: 100%;
        height: 1.13rem;
        font-size: 0.28rem;
        line-height: 1.13rem;
        background: #f0eff5;
        padding-left: 0.3rem;
        position: relative;
        .tipContent {
          position: absolute;
          text-align: end;
          padding-right: 0.28rem;
          height: 1.13rem;
          font-size: 0.28rem;
          line-height: 1.13rem;
          right: 0;
          top: 0;
        }
      }
    }
  }
}
// 谷歌登录按钮样式
#google-signin-button {
  // background: rgba(255, 255, 255, 0);
  position: absolute;
  opacity: 0;
  top: 0;
}
</style>

