<template>
  <div v-title="$route.meta.title">
    <v-head></v-head>
    <input v-if="langType==='en_US'" type="number" placeholder="Your firend's Invitation Code" v-model="codeValue" maxlength="8">
    <input v-else-if="langType==='zh_CN'" type="number" placeholder="请输入您好友的邀请码" v-model="codeValue" maxlength="8">
    <input v-else type="number" placeholder="Kod jemputan rakan anda" v-model="codeValue" maxlength="8">
    <div class="line"></div>
    <p class="tips">{{$t("message.inviteCode.enterCode")}}</p>
    <p class="tips">{{$t("message.inviteCode.receiveCoins")}}</p>
    <div class="submit" @click="commitCode()">{{$t("message.inviteCode.submit")}}</div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <div class="mask" v-if="showFlag"></div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import head from '../Modules/head'
import footer from '../Modules/footer'
import { Indicator } from 'mint-ui'
export default {
  name: 'inviteCode',
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      appv: '1.0',
      codeValue: '',
      warn_content: '',
      warn_type: 0,
      flag: true,
      code: '',
      langType: 'en_US',
      showFlag: false
    }
  },
  components: {
    vHead: head,
    vFooter: footer
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = 'inviteCode'
    this.langType = this.$store.state.langType
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === 'en_US'
    ) {
      this.langType = 'en_US'
      this.$i18n.locale = 'en_US'
      document.title = 'Enter Invitation Code'
    } else if (this.langType === 'zh_CN') {
      this.langType = 'zh_CN'
      this.$i18n.locale = 'zh_CN'
      document.title = '输入邀请码'
    } else {
      this.langType = 'ms_MY'
      this.$i18n.locale = 'ms_MY'
      document.title = 'Masukkan kod jemputan'
    }
    this.userid = this.$getHashParameter('userid')
    this.token = this.$getHashParameter('token')
    this.appv = this.$getHashParameter('infversionApp')
  },
  methods: {
    commitCode() {
      if (this.codeValue === '') {
        if (
          this.langType === null ||
          this.langType === undefined ||
          this.langType === 'en_US'
        ) {
          this.showWarnTips('You have not entered the invitation code')
        } else if (this.langType === 'zh_CN') {
          this.showWarnTips('您还没有输入邀请码')
        } else {
          this.showWarnTips('Anda tidak memasukkan kod jemputan')
        }
        return false
      }
      if (this.flag) {
        this.flag = false
        if (
          this.langType === null ||
          this.langType === undefined ||
          this.langType === 'en_US'
        ) {
          this.showFlag = true
          Indicator.open({
            text: 'Please wait while processing...',
            spinnerType: 'snake'
          })
        } else if (this.langType === 'zh_CN') {
          this.showFlag = true
          Indicator.open({
            text: '处理中，请稍候...',
            spinnerType: 'snake'
          })
        } else {
          this.showFlag = true
          Indicator.open({
            text: 'Sila tunggu sementara proses...',
            spinnerType: 'snake'
          })
        }
        let url = this.url
        let data = {
          userid: this.userid,
          token: this.token,
          ggc: this.codeValue,
          appv: this.appv,
          i18n: this.langType,
          Infversion: this.Infversion,
          Method: 'AcceptTeacherWap'
        }
        this.$apiPost(
          url,
          data,
          res => {
            // alert('Success')
            this.flag = true
            Indicator.close()
            this.showFlag = false
            // 成功
            console.log(res)
            this.warn_type = 1
            if (this.langType === 'zh_CN') {
              this.warn_content = '成功'
            } else if (this.langType === 'en_US') {
              this.warn_content = 'succeed'
            } else {
              this.warn_content = 'berjaya'
            }
            setTimeout(() => {
              this.warn_type = 0
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.webkit.messageHandlers.jumpView.postMessage('3')
              } else {
                window.taskCentre.jumpView('3')
              }
            }, 2000)
          },
          err => {
            this.flag = true
            Indicator.close()
            this.showFlag = false
            // 失败
            // console.log(err)
            this.showWarnTips(err.msg.substr(0))
          }
        )
      }
    },
    // 提示框公用方法
    showWarnTips(text) {
      this.warn_type = 1
      this.warn_content = text
      setTimeout(() => {
        this.warn_type = 0
      }, 2000)
    }
  }
}
</script>

<style lang="less">
.inviteCode {
  background: url('../../assets/images/icon1@2x.png') no-repeat;
  background-size: 100%;
  padding-top: 2.3rem;
  background-color: #f75448;
}
input {
  display: block;
  margin: 0 auto;
  width: 5.1rem;
  height: 0.75rem;
  border: 1px solid #999999;
  font-size: 0.28rem;
  color: #333333;
  text-align: center;
}
::-webkit-placeholder {
  color: #999999;
}
.line {
  width: 5.2rem;
  height: 1px;
  border-bottom: 1px dashed #e5e5e5;
  margin: 0.6rem auto 0.9rem;
}
.tips {
  padding: 0 1.3rem;
  font-size: 0.3rem;
  color: #e90036;
  line-height: 0.48rem;
}
.submit {
  width: 4.26rem;
  height: 0.97rem;
  margin: 1.2rem auto 0;
  background: url('../../assets/images/icon2@2x.png') no-repeat;
  background-size: 100%;
  font-size: 0.34rem;
  color: #ffffff;
  line-height: 0.97rem;
  text-align: center;
  font-weight: 700;
}
.mask {
  width: 4rem;
  height: 3rem;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 0.2rem;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
</style>
