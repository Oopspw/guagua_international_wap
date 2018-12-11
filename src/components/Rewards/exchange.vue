<template>
  <div v-title="$route.meta.title">
    <v-Heads></v-Heads>
    <div class="contain">
      <h3>{{$t("message.exchange.myBalance")}}</h3>
      <h1 v-if="!loginFlag">{{$t("message.exchange.getLogin")}}</h1>
      <h1 v-else>{{commafy(balancegold)}}</h1>
      <div
        v-if="!loginFlag"
        class="jumpBtn"
        @click="loginApp()"
      >{{$t("message.exchange.myExpenses")}}</div>
      <div v-else class="jumpBtn" @click="jumpView('2')">{{$t("message.exchange.myExpenses")}}</div>
      <img v-if="photo !==''&&loginFlag" class="userImg" :src="photo">
      <img v-if="!loginFlag" class="userImg" src="../../assets/images/icon.png">
    </div>
    <div class="paypalTitle">{{$t("message.exchange.PayPalReward")}}</div>
    <div class="paypalContent">
      <p>{{$t("message.exchange.exchagneTips")}}</p>
    </div>
    <ul class="payUl">
      <li
        v-if="loginFlag"
        class="payLi"
        @click="contactUs(item.amount)"
        v-for="item in exchangeList"
      >
        <div class="imgBox">
          <img src="../../assets/images/Cash@2x.png">
        </div>
        <div class="contentBox" v-if="langType !== 'ms_MY'">
          <h3 class="title">
            <span>RM{{item.amount}}</span>
            {{$t("message.exchange.MoneyWithdraw")}}
          </h3>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.first")}}</p>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
          <p
            class="desc"
            v-else
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
        </div>
        <div class="contentBox" v-else>
          <h3 class="title">
            {{$t("message.exchange.MoneyWithdraw")}}
            <span>RM{{item.amount}}</span>
          </h3>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.first")}}</p>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >menggunakan {{commafy(item.amount*1000)}} Coins sahaja</p>
          <p
            class="desc"
            v-else
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
        </div>
        <div class="arrowsBox">
          <img src="../../assets/images/right@2x.png">
        </div>
      </li>
      <li v-if="!loginFlag" class="payLi" @click="loginApp()" v-for="item in exchangeList">
        <div class="imgBox">
          <img src="../../assets/images/Cash@2x.png">
        </div>
        <div class="contentBox" v-if="langType !== 'ms_MY'">
          <h3 class="title">
            <span>RM{{item.amount}}</span>
            {{$t("message.exchange.MoneyWithdraw")}}
          </h3>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.first")}}</p>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
          <p
            class="desc"
            v-else
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
        </div>
        <div class="contentBox" v-else>
          <h3 class="title">
            {{$t("message.exchange.MoneyWithdraw")}}
            <span>RM{{item.amount}}</span>
          </h3>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >{{$t("message.exchange.first")}}</p>
          <p
            class="desc_tips"
            v-if="item.amount === 1||item.amount === '1'"
          >menggunakan {{commafy(item.amount*1000)}} Coins sahaja</p>
          <p
            class="desc"
            v-else
          >{{$t("message.exchange.consume")}} {{commafy(item.amount*1000)}} {{$t("message.coins")}}</p>
        </div>
        <div class="arrowsBox">
          <img src="../../assets/images/right@2x.png">
        </div>
      </li>
    </ul>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <v-foots></v-foots>
  </div>
</template>

<script>
import heads from "../Modules/heads";
import foots from "../Modules/foots";
import { InfiniteScroll } from "mint-ui";
export default {
  name: "exchange",
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      // user id
      userid: "335428",
      // user token
      token: "b3622cba-3d62-4126-814b-cbb25d7d9c68",
      appv: "1.0",
      loginFlag: false,
      photo: "",
      balancegold: "--",
      allgold: 0,
      email: "",
      exchangeList: [
        { amount: "1" },
        { amount: "10" },
        { amount: "25" },
        { amount: "50" }
      ],
      warn_content: "",
      warn_type: 0,
      langType: "en_US"
    };
  },
  components: {
    vHeads: heads,
    vFoots: foots
  },
  created() {
    this.userid = this.$getUrlParam("userid");
    this.token = this.$getUrlParam("token");
    this.appv = this.$getUrlParam("infversionApp");
    this.langType = this.$store.state.langType;
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === "en_US"
    ) {
      this.langType = "en_US";
      this.$i18n.locale = "en_US";
    } else if (this.langType === "zh_CN") {
      this.langType = "zh_CN";
      this.$i18n.locale = "zh_CN";
    } else {
      this.langType = "ms_MY";
      this.$i18n.locale = "ms_MY";
    }
    window["refreshMe"] = this.refreshMe;
    window["getArgument"] = this.getArgument;
    if (
      this.userid === null ||
      this.token === null ||
      this.userid === undefined ||
      this.token === undefined
    ) {
      this.loginFlag = false;
      return false;
    } else {
      this.loginFlag = true;
    }
  },
  mounted() {
    if (!global.consoleSwitch) {
      console.log = () => {};
    }
    document.getElementsByTagName("body")[0].className = "exchange";
    this.userid = this.$getUrlParam("userid");
    this.token = this.$getUrlParam("token");
    this.appv = this.$getUrlParam("infversionApp");
    this.langType = this.$store.state.langType;
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === "en_US"
    ) {
      this.langType = "en_US";
      this.$i18n.locale = "en_US";
      document.title = "Rewards";
    } else if (this.langType === "zh_CN") {
      this.langType = "zh_CN";
      this.$i18n.locale = "zh_CN";
      document.title = "兑换";
    } else {
      this.langType = "ms_MY";
      this.$i18n.locale = "ms_MY";
      document.title = "Ganjaran";
    }
    // this.getExchagneList()
    this.getBankList();
  },
  methods: {
    // methods skip page for ios and android
    jumpView(type) {
      if (type === "2") {
        localStorage.expenses = "expenses";
        // goole 用户事件监听
        this.handleOutboundLinkClicks("点击My Expenses");
      }
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(type);
      } else {
        window.taskCentre.jumpView(type);
      }
    },
    loginApp() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.loginApp.postMessage("");
      } else {
        window.taskCentre.loginApp();
      }
    },
    getArgument(userid, token, appv) {
      this.userid = userid;
      this.token = token;
      this.infversionApp = appv;
      this.getBankList();
    },
    // Skip to contactUs page
    contactUs(money) {
      // if (this.email !== '') {
      //   sessionStorage.email = this.email
      // }
      if (!this.loginFlag) {
        this.jumpView("2");
        return false;
      }
      if (this.allgold < money * 1000) {
        if (
          this.langType === "en_US" ||
          this.langType === undefined ||
          this.langType === null
        ) {
          this.showWarnTips("You don't have enough coins");
        } else if (this.langType === "zh_CN") {
          this.showWarnTips("您的金币不足");
        } else {
          this.showWarnTips("Anda tidak mempunyai cukup duit syiling");
        }
        return false;
      }
      let date = new Date();
      let day = date.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let year = date.getFullYear();
      sessionStorage.time = day + "/" + month + "/" + year;
      sessionStorage.money = money;
      sessionStorage.userid = this.userid;
      sessionStorage.token = this.token;
      sessionStorage.appv = this.appv;
      sessionStorage.langType = this.langType;
      // goole 用户事件监听
      this.handleOutboundLinkClicks(money + "RN兑换");
      this.$router.push({ path: "/extract" });
    },
    getBankList() {
      if (
        this.userid === null ||
        this.token === null ||
        this.userid === undefined ||
        this.token === undefined
      ) {
        this.loginFlag = false;
        return false;
      } else {
        this.loginFlag = true;
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        i18n: this.langType,
        appv: this.appv,
        Method: "QueryBankExchageInfo"
      };
      this.$apiPost(
        url,
        data,
        res => {
          console.log(res);
          this.balancegold = res.data.balancegold;
          this.allgold = res.data.balancegold * 1;
          this.photo = res.data.photo;
          sessionStorage.mobile = res.data.bankphonenumber;
          sessionStorage.bankaccountname = res.data.bankaccountname;
          sessionStorage.bankaccountnumber = res.data.bankaccountnumber;
          this.exchangeList = res.data.exchangeinfo;
        },
        res => {
          // console.log(res)
          this.showWarnTips(res.msg.substr(2));
        }
      );
    },
    // getExchangeList 为paypal兑换获取 暂时不用
    getExchagneList() {
      if (
        this.userid === null ||
        this.token === null ||
        this.userid === undefined ||
        this.token === undefined
      ) {
        this.loginFlag = false;
        return false;
      } else {
        this.loginFlag = true;
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        i18n: this.langType,
        appv: this.appv,
        Method: "QueryPaypalExchageInfo"
      };
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.balancegold = res.data.balancegold;
          this.allgold = res.data.balancegold * 1;
          this.photo = res.data.photo;
          this.email = res.data.email;
          sessionStorage.mobile = res.data.mobile;
          this.exchangeList = res.data.exchangeinfo;
        },
        res => {
          // console.log(res)
          this.showWarnTips(res.msg.substr(2));
        }
      );
    },
    // Common methods for prompting
    showWarnTips(text) {
      this.warn_type = 1;
      this.warn_content = text;
      setTimeout(() => {
        this.warn_type = 0;
      }, 2000);
    },
    // Convert the number to thousandths
    commafy(num) {
      let iValue = num;
      let sValue = iValue + "";
      let aValue = new Array();
      let iNum = sValue.length % 3;
      let aResult;
      let index = 0;
      if (sValue.length <= 3) {
        return iValue;
      } else {
        if (iNum == 0) {
          for (var i = 0; i < sValue.length; i = i + 3) {
            aValue[index] = sValue[i] + "" + sValue[i + 1] + "" + sValue[i + 2];
            index++;
          }
        } else if (iNum == 1) {
          aValue[0] = sValue[0];
          index = 1;
          for (var i = 1; i < sValue.length; i = i + 3) {
            aValue[index] = sValue[i] + "" + sValue[i + 1] + "" + sValue[i + 2];
            index++;
          }
        } else if (iNum == 2) {
          aValue[0] = sValue[0] + "" + sValue[1];
          index = 1;
          for (var i = 2; i < sValue.length; i = i + 3) {
            aValue[index] = sValue[i] + "" + sValue[i + 1] + "" + sValue[i + 2];
            index++;
          }
        }
        aResult = aValue.join(",");
        return aResult.toString();
      }
    },
    refreshMe() {
      if (this.loginFlag === true) {
        this.getBankList();
      }
    },
    handleOutboundLinkClicks(type, event) {
      ga("send", "event", {
        eventCategory: type,
        eventAction: "click"
        // eventLabel: event.target.href
      });
    }
  }
};
</script>

<style lang="less">
.exchange {
  background: #f0eff5;
  padding-bottom: 1.1rem;
  height: auto;
}
.contain {
  width: 100%;
  height: 3.42rem;
  background: -webkit-linear-gradient(30deg, #9d2d9d 35%, #d12d62 75%);
  background: linear-gradient(30deg, #9d2d9d 35%, #d12d62 75%);
  padding-top: 0.64rem;
  position: relative;
  h3 {
    font-size: 0.28rem;
    text-align: center;
    color: #ffffff;
    margin-bottom: 0.47rem;
  }
  h1 {
    font-size: 0.5rem;
    text-align: center;
    color: #ffffff;
    margin-bottom: 0.45rem;
    font-weight: 700;
  }
  .jumpBtn {
    width: 3.04rem;
    height: 0.72rem;
    background: -webkit-linear-gradient(30deg, #f1a438 25%, #fae04f 75%);
    background: linear-gradient(30deg, #f1a438 25%, #fae04f 75%);
    margin: 0 auto;
    border-radius: 0.4rem;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.72rem;
    color: #ffffff;
    box-shadow: 0.03rem 0.06rem 0.03rem rgba(109, 37, 57, 0.5);
  }
  .userImg {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    border: 0.02rem solid #ffffff;
    position: absolute;
    background: #ffffff;
    top: 0.82rem;
    left: 0.45rem;
  }
}
.paypalTitle {
  width: 100%;
  height: 1.27rem;
  font-size: 0.36rem;
  line-height: 1.27rem;
  color: #e81736;
  background: #ffffff;
  margin-top: 0.24rem;
  padding-left: 0.3rem;
}
.paypalContent {
  width: 100%;
  padding: 0.3rem 0.25rem 0.3rem;
  p {
    font-size: 0.26rem;
    color: #777777;
    line-height: 0.36rem;
  }
}
.payUl {
  width: 100%;
  padding: 0 0.25rem;
  .payLi {
    width: 7.06rem;
    height: 1.81rem;
    background: #ffffff;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    .imgBox {
      width: 20%;
      height: 1.81rem;
      overflow: hidden;
      position: relative;
      img {
        display: block;
        max-width: 2rem;
        height: 1rem;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
      }
    }
    .contentBox {
      width: 70%;
      height: 1.81rem;
      padding: 0 0 0 0.2rem;
      .title {
        color: #222222;
        width: 4rem;
        margin-top: 0.5rem;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.3rem;
        line-height: 0.34rem;
        span {
          color: #e50136;
        }
      }
      .desc {
        font-size: 0.24rem;
        margin-top: 0.25rem;
        color: #999999;
      }
      .desc_tips {
        font-size: 0.24rem;
        margin-top: 0.1rem;
        color: #999999;
      }
    }
    .arrowsBox {
      width: 10%;
      height: 1.81rem;
      position: relative;
      img {
        height: 0.3rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(51, 51, 51, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 166;
}
</style>
