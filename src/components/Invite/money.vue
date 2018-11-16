<template>
  <div v-title="$route.meta.title">

    <Vhead></Vhead>
    <!-- bannar 图 -->
    <div class="bannar">
      <img v-if="langType ==='en_US'" src="../../assets/images/en/iocn_top@2x.png" alt="">
      <img v-if="langType ==='zh_CN'" src="../../assets/images/cn/iocn_top@2x.png" alt="">
      <img v-if="langType ==='ms_MY'" src="../../assets/images/my/iocn_top@2x.png" alt="">
    </div>
    <div class="bigBox">
      <div class="Box">
        <div class="step">
          <h3><em>1</em>{{$t("message.money.stepTitle_one")}}</h3>
          <p>{{$t("message.money.stepText_one")}}</p>
          <div class="inviteBox">
            <ul class="inviteWay">
              <li class="whatApp" @click="shareChannel('Whatsapp')">
                <img src="../../assets/images/WSAPP@2x.png" alt="">
              </li>
              <li class="faceBook" @click="shareChannel('Facebook')">
                <img src="../../assets/images/FB@2x.png" alt="">
              </li>
              <li class="wechat" @click="shareChannel('Wechat')">
                <img src="../../assets/images/WC@2x.png" alt="">
              </li>
              <li class="message" @click="shareChannel('Messenger')">
                <img src="../../assets/images/MEs@2x.png" alt="">
              </li>
              <li class="Circle" @click="shareChannel('WechatMoments')">
                <img src="../../assets/images/mmt@2x.png" alt="">
              </li>
              <li class="more" @click="shareChannel('all')">
                <img src="../../assets/images/more@2x.png" alt="">
              </li>
            </ul>
            <h1 class="and">{{$t("message.money.and")}}</h1>
            <div class="qrcodeBox">
              <img v-if="userstate === '1'&&loginFlag" :src="shareqrcode">
              <img v-if="!loginFlag" src="../../assets/images/icon.png">
              <p>{{$t("message.money.tips")}}</p>
            </div>
          </div>
        </div>
        <div class="step">
          <h3><em>2</em>{{$t("message.money.stepTitle_two")}}</h3>
          <p>{{$t("message.money.stepText_two")}}</p>
          <div class="mycode">
            <div v-if="userstate === '1'&&loginFlag" class="codeBox" @click="copyCode(ggc)">
              <div class="code">{{ ggc }}</div>
              <p>{{$t("message.money.inviteCode")}}</p>
            </div>
            <h3 v-else @click="loginApp()">{{$t("message.money.loginAcquisition")}}</h3>
          </div>
          <h4 class="howUse" @click="mask=true"><img src="../../assets/images/tips@2x.png"> {{$t("message.money.howUse")}}</h4>
        </div>
        <div class="step">
          <h3><em>3</em>{{$t("message.money.stepTitle_three")}}</h3>
          <p>{{$t("message.money.stepText_three")}}</p>
          <img class="stepImg" src="../../assets/images/003@2x.png" alt="">
        </div>
        <div class="step">
          <h3><em>4</em>{{$t("message.money.stepTitle_four")}}</h3>
          <p>{{$t("message.money.stepText_four")}}</p>
          <img v-if="langType ==='en_US'" class="stepImg" src="../../assets/images/en/004@2x.png" alt="">
          <img v-if="langType ==='zh_CN'" class="stepImg" src="../../assets/images/cn/004@2x.png" alt="">
          <img v-if="langType ==='ms_MY'" class="stepImg" src="../../assets/images/my/004@2x.png" alt="">
        </div>
        <div class="step">
          <h3><em>5</em>{{$t("message.money.stepTitle_five")}}</h3>
          <p>{{$t("message.money.stepText_five")}}</p>
          <img class="stepImg" src="../../assets/images/005@2x.png" alt="">

          <img v-if="langType ==='en_US'" class="Chart" src="../../assets/images/en/Chart@2x.png" alt="">
          <img v-if="langType ==='zh_CN'" class="Chart" src="../../assets/images/cn/Chart@2x.png" alt="">
          <img v-if="langType ==='ms_MY'" class="Chart" src="../../assets/images/my/Chart@2x.png" alt="">

          <img class="arrows" src="../../assets/images/Rectangle6@2x.png" alt="">

          <img @click="shareChannel('all')" v-if="langType ==='en_US'" class="inviteButton" src="../../assets/images/en/Buttonbig@2x.png" alt="">
          <img @click="shareChannel('all')" v-if="langType ==='zh_CN'" class="inviteButton" src="../../assets/images/cn/Buttonbig@2x.png" alt="">
          <img @click="shareChannel('all')" v-if="langType ==='ms_MY'" class="inviteButton" src="../../assets/images/my/Buttonbig@2x.png" alt="">
        </div>
      </div>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <div v-if="mask" class="mask" @touchmove.prevent></div>
    <div v-if="mask" class="howUseBox" @touchmove.prevent>
      <img v-if="langType ==='en_US'" class="inviteButton" src="../../assets/images/en/Group3@2x.png" alt="">
      <img v-if="langType ==='zh_CN'" class="inviteButton" src="../../assets/images/cn/Group3@2x.png" alt="">
      <img v-if="langType ==='ms_MY'" class="inviteButton" src="../../assets/images/my/Group3@2x.png" alt="">
      <img class="closeBox" src="../../assets/images/closeBox@2x.png" @click="mask=false">
    </div>
    <Vfooter></Vfooter>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import Vhead from '../Modules/head'
import Vfooter from '../Modules/footer'
export default {
  name: 'money',
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      appv: '',
      ggc: '----',
      loginFlag: false,
      mask: false,
      explainType: 1,
      shareqrcode: '',
      userstate: '',
      warn_content: '',
      warn_type: 0,
      langType: 'en_US'
    }
  },
  components: {
    Vhead: Vhead,
    Vfooter: Vfooter
  },
  created() {
    this.userid = this.$getUrlParam('userid')
    this.token = this.$getUrlParam('token')
    this.appv = this.$getUrlParam('infversionApp')
    this.langType = this.$getUrlParam('lang')
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === 'en_US'
    ) {
      this.langType = 'en_US'
      this.$i18n.locale = 'en_US'
    } else if (this.langType === 'zh_CN') {
      this.langType = 'zh_CN'
      this.$i18n.locale = 'zh_CN'
    } else {
      this.langType = 'ms_MY'
      this.$i18n.locale = 'ms_MY'
    }
    window['getArgument'] = this.getArgument
    if (
      this.userid === null ||
      this.token === null ||
      this.userid === undefined ||
      this.token === undefined
    ) {
      this.loginFlag = false
      return false
    } else {
      this.loginFlag = true
    }
  },
  mounted() {
    window['reloadMe'] = function() {
      window.location.reload()
    }
    document.getElementsByTagName('body')[0].className = 'money'
    this.langType = this.$getUrlParam('lang')
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === 'en_US'
    ) {
      this.langType = 'en_US'
      this.$i18n.locale = 'en_US'
      document.title = 'Invite'
    } else if (this.langType === 'zh_CN') {
      this.langType = 'zh_CN'
      this.$i18n.locale = 'zh_CN'
      document.title = '邀请'
    } else {
      this.langType = 'ms_MY'
      this.$i18n.locale = 'ms_MY'
      document.title = 'Menjemput'
    }
    this.userid = this.$getUrlParam('userid')
    this.token = this.$getUrlParam('token')
    this.appv = this.$getUrlParam('infversionApp')
    if (
      this.userid === null ||
      this.token === null ||
      this.userid === undefined ||
      this.token === undefined
    ) {
      return false
    }
    this.getPageInfo()
    this.showRightBtn('yes')
  },
  methods: {
    chooseMe(type) {
      this.explainType = type
    },
    // interactive methods
    // copy code
    copyCode(icode) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.copyCode.postMessage('')
      } else {
        window.taskCentre.copyCode(icode)
      }
    },
    // show left bottom
    showRightBtn(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showRightBtn.postMessage(type)
      } else {
        window.taskCentre.showRightBtn(type)
      }
    },
    shareChannel(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.shareChannel.postMessage(type)
      } else {
        window.taskCentre.shareChannel(type, '', '', '-1')
      }
    },
    getPageInfo() {
      if (
        this.userid === null ||
        this.token === null ||
        this.userid === undefined ||
        this.token === undefined
      ) {
        this.loginFlag = false
        return false
      } else {
        this.loginFlag = true
      }
      Indicator.open()
      let url = this.url
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        i18n: this.langType,
        Method: 'QueryUserInfoWap'
      }
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.shareqrcode = res.data.shareqrcode
          this.userstate = res.data.userstate
          this.ggc = res.data.ggc
          Indicator.close()
        },
        res => {
          // console.log(res)
          Indicator.close()
        }
      )
    },
    loginApp() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.loginApp.postMessage('')
      } else {
        window.taskCentre.loginApp()
      }
    },
    getArgument(userid, token, appv) {
      this.userid = userid
      this.token = token
      this.infversionApp = appv
      this.getPageInfo()
    }
  }
}
</script>

<style lang="less">
@font-face {
  font-family: 'font_b';
  src: url('../../assets/fonts/PINGFANGREGULAR.ttf') format('truetype');
}
.money {
  background: #ffffff;
}
.bannar {
  width: 100vw;
  height: 2.35rem;
  padding-bottom: 0.15rem;
  background: #f7f7ff;
  img {
    width: 100%;
    height: 2.2rem;
  }
}
.bigBox {
  width: 100vw;
  padding-left: 0.47rem;
  padding-top: 0.4rem;
  .Box {
    width: 100%;
    border-left: 1px solid #c9c9c9;
    .step {
      margin-bottom: 0.6rem;
      .stepImg {
        width: 100%;
        display: block;
        margin: 0 auto;
      }
      .Chart {
        width: 90%;
        display: block;
        margin: 0.45rem auto 0;
      }
      .arrows {
        width: 0.27rem;
        display: block;
        margin: 0.75rem auto 0;
      }
      .inviteButton {
        width: 6.65rem;
        display: block;
        margin: 0.5rem auto 0;
      }
      h3 {
        color: #ff0220;
        font-size: 0.26rem;
        padding-left: 0.25rem;
        position: relative;
        em {
          position: absolute;
          width: 0.42rem;
          height: 0.42rem;
          background: #ff0220;
          color: #ffffff;
          text-align: center;
          line-height: 0.42rem;
          border-radius: 50%;
          top: -0.05rem;
          left: -0.22rem;
        }
      }
      p {
        margin-top: 0.15rem;
        font-size: 0.3rem;
        padding-left: 0.25rem;
        padding-right: 0.2rem;
      }
      .inviteBox {
        margin-top: 0.27rem;
        width: 100%;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        .inviteWay {
          width: 4rem;
          height: 2.4rem;
          display: flex;
          display: -webkit-box;
          display: -webkit-flex;
          flex-wrap: wrap;
          li {
            width: 33.3%;
            height: 1.2rem;
            position: relative;
            img {
              position: absolute;
              width: 0.86rem;
              height: 0.86rem;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              -webkit-transform: translate(-50%, -50%);
            }
          }
        }
        .and {
          font-size: 0.3rem;
          height: 2.4rem;
          line-height: 2.4rem;
        }
        .qrcodeBox {
          width: 2.5rem;
          height: 2.4rem;
          padding-top: 0.35rem;
          img {
            width: 1.35rem;
            height: 1.35rem;
            display: block;
            margin: 0 auto;
          }
          p {
            margin-top: 0.15rem;
            font-size: 0.18rem;
            text-align: center;
            color: #6c6c6c;
            padding-left: 0;
          }
        }
      }
      .mycode {
        height: 1.75rem;
        position: relative;
        h4 {
          font-size: 0.26rem;
          text-align: center;
          position: relative;
        }
        .codeBox {
          width: 3.15rem;
          height: 1rem;
          border: 2px solid #db4259;
          text-align: center;
          border-radius: 0.5rem;
          margin: 0.3rem auto 0;
          padding-top: 0.08rem;
          .code {
            font-size: 0.5rem;
            font-weight: 700;
            color: #e61937;
            line-height: 0.52rem;
          }
          p {
            font-size: 0.24rem;
            color: #333333;
            margin: 0;
            padding: 0;
          }
        }

        h3 {
          position: absolute;
          width: 100%;
          top: 50%;
          font-size: 0.32rem;
          text-align: center;
          color: #e61937;
          font-weight: 700;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
        }
      }
      .howUse {
        font-size: 0.26rem;
        text-align: right;
        color: #265fb6;
        padding-right: 0.2rem;
        text-decoration: underline;
        img {
          width: 0.34rem;
          height: 0.34rem;
          vertical-align: middle;
        }
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 166;
}
.howUseBox {
  width: 6rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 166;
  img {
    width: 100%;
  }
  .closeBox {
    width: 0.7rem;
    height: 0.7rem;
    display: block;
    margin: 0.2rem auto 0;
  }
}
</style>
