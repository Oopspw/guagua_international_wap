<template>
  <div v-title="$route.meta.title">
    <img class="bankLogo" src="../../assets/images/Maybank@2x.png" alt="">
    <h3 class="bankName">{{$t("message.extract.bankName")}}</h3>
    <p class="bankMoney"><span>RM</span> {{money}}</p>
    <div class="showContent">
      <p class="left">{{$t("message.extract.ConsumeCoins")}}</p>
      <p class="right">{{money * 1000}}</p>
      <p class="left">{{$t("message.extract.Time")}}</p>
      <p class="right">{{time}}</p>
    </div>
    <div class="nullBox"></div>
    <div class="box">
      <ul>
        <li>
          <h2 class="left">{{$t("message.extract.BankName")}}</h2>
          <div class="right redColor">{{$t("message.extract.MayBank")}}</div>
        </li>
        <li>
          <h2 class="left">{{$t("message.extract.AccountNumber")}}</h2>
          <input v-if="langType==='en_US'&&eyes==='show'" class="right" type="text" v-model="accountNumber" placeholder="Please check the account carefully">
          <input v-else-if="langType==='en_US'&&eyes!=='show'" class="right" type="button" @click="showAccountNumber()" v-model="accountNumber" placeholder="Please check the account carefully">
          <input v-else-if="langType==='zh_CN'&&eyes==='show'" class="right" type="text" v-model="accountNumber" placeholder="请仔细核对账号">
          <input v-else-if="langType==='zh_CN'&&eyes!=='show'" class="right" type="button" @click="showAccountNumber()" v-model="accountNumber" placeholder="请仔细核对账号">
          <input v-else-if="langType==='ms_MY'&&eyes==='show'" class="right" type="text" v-model="accountNumber" placeholder="Sila semak nombor akaun">
          <input v-else-if="langType==='ms_MY'&&eyes!=='show'" class="right" type="button" @click="showAccountNumber()" v-model="accountNumber" placeholder="Sila semak nombor akaun">
          <div class="eyes" @click="showAccountNumber()">
            <img v-if="eyes==='show'" src="../../assets/images/visible@2x.png" alt="">
            <img class="hideAN" v-else src="../../assets/images/invisible@2x.png" alt="">
          </div>
        </li>
        <li>
          <h2 class="left">{{$t("message.extract.RecipientsName")}}</h2>
          <input v-if="langType==='en_US'" class="right" type="text" v-model="userName" placeholder="Please enter your name">
          <input v-else-if="langType==='zh_CN'" class="right" type="text" v-model="userName" placeholder="请输入您的姓名">
          <input v-else class="right" type="text" v-model="userName" placeholder="Masukkan nama akaun">
        </li>
        <li>
          <h2 class="left">{{$t("message.extract.PhoneNumber")}}</h2>
          <input v-if="langType==='en_US'" class="right" type="number" v-model="mobile" placeholder="Please enter your phone number">
          <input v-else-if="langType==='zh_CN'" class="right" type="number" v-model="mobile" placeholder="请输入您的手机号">
          <input v-else class="right" type="number" v-model="mobile" placeholder="Masukkan nombor telefon bimbit">
        </li>
      </ul>
      <div class="buttonBox">
        <div class="precautions" @click="showPrecautions()">{{$t("message.extract.Precautions")}}</div>
        <div class="redeem" @click="commitInfo()">{{$t("message.extract.Redeem")}}</div>
      </div>
    </div>
    <div class="nullBox"></div>
    <h4 class="tipsTitle">{{$t("message.extract.Precautions")}}</h4>
    <p class="tipsContent">{{$t("message.extract.tip_1")}}</p>
    <p class="tipsContent">{{$t("message.extract.tip_2")}}</p>
    <p class="tipsContent">{{$t("message.extract.tip_3")}}</p>
    <p class="tipsContent">{{$t("message.extract.tip_4")}}</p>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'extract',
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      userid: '',
      token: '',
      appv: '',
      initNumber: '',
      accountNumber: '',
      time: '',
      mobile: '',
      userName: '',
      money: 0,
      warn_content: '',
      warn_type: 0,
      langType: 'en_US',
      eyes: 'hide'
    }
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = 'extract'
    this.userid = sessionStorage.userid
    this.token = sessionStorage.token
    this.appv = sessionStorage.appv
    this.time = sessionStorage.time
    this.mobile = sessionStorage.mobile
    this.money = sessionStorage.money
    this.initNumber = sessionStorage.bankaccountnumber
    this.userName = sessionStorage.bankaccountname
    if (
      this.initNumber == '' ||
      this.initNumber == undefined ||
      this.initNumber == null
    ) {
      this.accountNumber = ''
      this.eyes = 'show'
    } else {
      if (this.initNumber.length > 8) {
        this.accountNumber =
          this.initNumber.substr(0, 4) + '****' + this.initNumber.substr(-4)
      } else {
        this.accountNumber = this.initNumber.substr(0, 1) + '****'
      }
    }
    this.langType = sessionStorage.langType
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === 'en_US'
    ) {
      this.langType = 'en_US'
      this.$i18n.locale = 'en_US'
      document.title = 'Withdraw'
    } else if (this.langType === 'zh_CN') {
      this.langType = 'zh_CN'
      this.$i18n.locale = 'zh_CN'
      document.title = '兑换'
    } else {
      this.langType = 'ms_MY'
      this.$i18n.locale = 'ms_MY'
      document.title = 'Pengeluaran Tunai'
    }
  },
  methods: {
    showReturn() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showReturn.postMessage('')
      } else {
        window.taskCentre.showReturn()
      }
    },
    // expenses
    jumpView(type) {
      localStorage.expenses = 'expenses'
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(type)
      } else {
        window.taskCentre.jumpView(type)
      }
    },
    showAccountNumber() {
      if (this.eyes === 'show') {
        this.eyes = 'hide'
        this.initNumber = this.accountNumber
        if (
          this.initNumber == '' ||
          this.initNumber == undefined ||
          this.initNumber == null
        ) {
          this.accountNumber = ''
        } else {
          if (this.initNumber.length > 8) {
            this.accountNumber =
              this.initNumber.substr(0, 4) + '****' + this.initNumber.substr(-4)
          } else {
            this.accountNumber = this.initNumber.substr(0, 1) + '****'
          }
        }
      } else {
        this.eyes = 'show'
        this.accountNumber = this.initNumber
      }
    },
    commitInfo() {
      if (this.eyes === 'show') {
        this.initNumber = this.accountNumber
      }
      if (
        this.initNumber === '' ||
        this.mobile === '' ||
        this.userName === ''
      ) {
        // Please enter your valid email address
        if (this.langType === 'en_US') {
          this.showWarnTips('Please fill in the valid withdrawal information')
        } else if (this.langType === 'zh_CN') {
          this.showWarnTips('请填写完整有效的提现信息')
        } else {
          this.showWarnTips('Sila isi maklumat yang sah pengeluaran')
        }
        return false
      }
      // return false
      let url = this.url
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        exchange_type: 'bank',
        bankaccountnumber: this.initNumber,
        bankaccountname: this.userName,
        bankphonenumber: this.mobile,
        money: this.money,
        i18n: this.langType,
        Method: 'SaveAlipayRecordWap'
      }
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.showWarnTips(res.msg.substr(2))
          localStorage.expenses = 'expenses'
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            window.webkit.messageHandlers.jumpView.postMessage('2')
          } else {
            window.taskCentre.jumpView('2')
          }
        },
        res => {
          //console.log(res)
          this.showWarnTips(res.msg.substr(2))
        }
      )
    },
    showPrecautions() {
      document.body.scrollTop = document.documentElement.scrollTop = 1000
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
.extract {
  background: #ffffff;
  padding: 0;
}
.bankLogo {
  display: block;
  width: 1.67rem;
  margin: 0.32rem auto 0.28rem;
}
.bankName {
  font-size: 0.32rem;
  text-align: center;
  margin-bottom: 0.44rem;
}
.bankMoney {
  font-size: 0.64rem;
  color: #e50134;
  text-align: center;
  font-weight: 700;
  span {
    font-size: 0.58rem;
    font-weight: 700;
  }
}
.redColor {
  color: #e50134;
}
.showContent {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  flex-wrap: wrap;
  margin-top: 0.65rem;
  .left {
    width: 50%;
    font-size: 0.26rem;
    color: #555555;
    text-align: left;
    margin-bottom: 0.35rem;
  }
  .right {
    width: 50%;
    font-size: 0.26rem;
    color: #555555;
    text-align: right;
    margin-bottom: 0.35rem;
  }
}
.nullBox {
  width: 100vw;
  height: 0.3rem;
  background: #f0eff5;
}
.box {
  width: 100%;
  padding: 0 0.25rem;
  ul {
    width: 100%;
    li {
      display: flex;
      display: -webkit-flex;
      display: -webkit-box;
      width: 100%;
      height: 1.1rem;
      border-bottom: 1px solid #f0eff4;
      overflow: hidden;
      position: relative;
      .left {
        width: 35%;
        height: 1.1rem;
        font-size: 0.26rem;
        line-height: 1.1rem;
        color: #222222;
      }
      .right {
        display: block;
        width: 65%;
        height: 1.1rem;
        font-size: 0.26rem;
        line-height: 1.1rem;
        border: none;
        outline: none;
        text-align: left;
        background: #ffffff;
        border: none;
        -webkit-appearance: none;
      }
      .right::-webkit-input-placeholder {
        font-size: 0.2rem;
      }
      .eyes {
        position: absolute;
        width: 0.6rem;
        height: 1.1rem;
        text-align: center;
        top: 0;
        right: 0;
        background: #ffffff;
        img {
          display: block;
          width: 0.42rem;
          margin-top: 0.4rem;
        }
        .hideAN {
          margin-top: 0.5rem;
        }
      }
    }
  }
  .buttonBox {
    width: 100%;
    margin-top: 0.52rem;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    padding-bottom: 0.5rem;
    .precautions {
      width: 2.63rem;
      height: 0.95rem;
      font-size: 0.26rem;
      color: #e61937;
      border: 1px solid #e61937;
      line-height: 0.95rem;
      border-radius: 0.1rem;
      text-align: center;
      margin: 0 auto;
    }
    .redeem {
      width: 3.9rem;
      height: 0.95rem;
      font-size: 0.26rem;
      background: #e61937;
      color: #ffffff;
      line-height: 0.95rem;
      border-radius: 0.1rem;
      text-align: center;
      margin: 0 auto;
    }
  }
}
.tipsTitle {
  padding-left: 0.3rem;
  font-size: 0.3rem;
  color: #111111;
  margin-top: 0.4rem;
  margin-bottom: 0.38rem;
}
.tipsContent {
  font-size: 0.28rem;
  color: #707070;
  padding-left: 0.3rem;
  line-height: 0.46rem;
}
</style>
