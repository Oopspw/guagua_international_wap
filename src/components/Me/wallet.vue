<template>
  <div v-title="$route.meta.title">
    <v-Heads></v-Heads>
    <!-- wallet heads -->
    <div class="header">
      <h3
        :class="chooseType ==='income'?'choose':''"
        @click="select('income')"
      >{{$t("message.wallet.income")}}</h3>
      <h3
        :class="chooseType ==='expenses'?'choose':''"
        @click="select('expenses')"
      >{{$t("message.wallet.expenses")}}</h3>
    </div>
    <!-- income check heads -->
    <div class="income" v-if="chooseType ==='income'">
      <div class="allIncome">
        <p>{{$t("message.wallet.allIncome")}}</p>
        <h3>{{ commafy(totalgold) }}</h3>
      </div>
      <div class="tabBox">
        <div class="tables">
          <div
            class="typeBox"
            :class="selectType ==='offers'?'select':''"
            @click="choose('2','offers')"
          >
            <h3>{{$t("message.wallet.offers")}}</h3>
            <p>{{ commafy(fenxianggold) }}</p>
          </div>
          <div class="line"></div>
          <div
            class="typeBox"
            :class="selectType ==='invite'?'select':''"
            @click="choose('3','invite')"
          >
            <h3>{{$t("message.wallet.invite")}}</h3>
            <p>{{ commafy(shitugold) }}</p>
          </div>
          <div class="line"></div>
          <div
            class="typeBox"
            :class="selectType ==='other'?'select':''"
            @click="choose('0','other')"
          >
            <h3>{{$t("message.wallet.other")}}</h3>
            <p>{{ commafy(qitagold) }}</p>
          </div>
        </div>
      </div>
      <div class="offersBox" v-if="selectType === 'offers'">
        <h3 class="onlyShow">— {{$t("message.wallet.onlySevenDay")}} —</h3>
        <div v-if="nodata" class="nodata">
          <img src="../../assets/images/default@2x.png">
          <p>{{$t("message.wallet.nodata")}}</p>
          <div class="goShare" @click="jumpView('1')">{{$t("message.wallet.shareEarningCoins")}}</div>
        </div>
        <div class="offersVessel" v-for="(item,index) in offersList">
          <div class="offersDate">
            <h3>{{item.times}}</h3>
            <p>+{{commafy(item.totalgold)}}</p>
          </div>
          <ul class="offersUl">
            <li class="offersLi" v-for="(list,index) in item.contentitem">
              <div class="imgBox">
                <img :src="list.photo">
              </div>
              <div class="contents">
                <div class="textBox">
                  <h3>{{list.title}}</h3>
                  <p>{{list.createtime}}</p>
                </div>
                <div class="goldNum">+{{commafy(list.golds)}}</div>
                <div
                  class="readBox"
                >{{$t("message.Read")}}{{list.hits}}&nbsp;&nbsp;|&nbsp;&nbsp;{{$t("message.UnitPrice")}}{{commafy(list.clickgold)}} {{$t("message.wallet.coins")}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="inviteBox" v-if="selectType === 'invite'">
        <div v-if="nodata" class="nodata">
          <img src="../../assets/images/default@2x.png">
          <p>{{$t("message.wallet.nodata")}}</p>
          <div class="goShare" @click="jumpView('4')">{{$t("message.wallet.inviteEarningCoins")}}</div>
        </div>
        <div
          v-else
          class="invitebox"
          @click="getDayDetails(item.incometime)"
          v-for="(item,index) in inviteList"
          v-infinite-scroll="inviteMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <div class="inviteDate">
            <h3>{{item.incometime}}</h3>
            <p>
              +{{commafy(item.golds)}}
              <span :class="ListDate === item.incometime?'hide':'show'"></span>
            </p>
          </div>
          <ul class="inviteUl" v-if="ListDate === item.incometime">
            <li class="inviteLi" v-for="list in inviteDetailList">
              <div class="contentBox">
                <h3>{{list.content}}</h3>
                <p>{{list.createtime}}</p>
              </div>
              <div class="goldNum">+{{commafy(list.gold)}}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="otherBox" v-if="selectType === 'other'">
        <div v-if="nodata" class="nodata">
          <img src="../../assets/images/default@2x.png">
          <p>{{$t("message.wallet.otherNodata")}}</p>
        </div>
        <div
          class="otherbox"
          @click="getDayDetails(item.incometime)"
          v-for="(item,index) in otherList"
          v-infinite-scroll="otherMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <div class="otherDate">
            <h3>{{item.incometime}}</h3>
            <p>
              +{{commafy(item.golds)}}
              <span :class="ListDate === item.incometime?'hide':'show'"></span>
            </p>
          </div>
          <ul class="otherUl" v-if="ListDate === item.incometime">
            <li class="otherLi" v-for="list in otherDetailList">
              <div class="contentBox">
                <h3>{{list.content}}</h3>
                <p>{{list.createtime}}</p>
              </div>
              <div class="goldNum">+{{commafy(list.gold)}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- expenses check heads -->
    <div class="expenses" v-if="chooseType ==='expenses'">
      <div class="vomit">
        <div class="allExpenses">
          <h3>
            <p>{{$t("message.wallet.totalExpenses")}}</p>
          </h3>
          <h4>{{withdraw}}</h4>
        </div>
      </div>
      <div class="expensesList" v-if="!nodatas">
        <ul>
          <li v-for="item in exchangeList">
            <div class="imgBox">
              <img src="../../assets/images/Maybank@2x.png">
            </div>
            <div class="contentBox" v-if="langType !== 'ms_MY'">
              <h2 class="title">
                <span>RM{{commafy(item.amount)}}</span>
                {{$t("message.exchange.MoneyWithdraw")}}
              </h2>
              <h3
                class="content"
                v-if="item.state === '1'||item.state === '2'"
              >{{$t("message.Consume")}} {{commafy(item.gold)}} {{$t("message.coins")}}</h3>
              <h3
                class="content"
                v-if="item.state === '3'"
              >{{$t("message.Return")}} {{commafy(item.gold)}} {{$t("message.coins")}}</h3>
              <p class="time">{{item.createtime}}</p>
            </div>
            <div class="contentBox" v-else>
              <h2 class="title">
                {{$t("message.exchange.MoneyWithdraw")}}
                <span>RM{{commafy(item.amount)}}</span>
              </h2>
              <h3
                class="content"
                v-if="item.state === '1'||item.state === '2'"
              >{{$t("message.Consume")}} {{commafy(item.gold)}} {{$t("message.coins")}}</h3>
              <h3
                class="content"
                v-if="item.state === '3'"
              >{{$t("message.Return")}} {{commafy(item.gold)}} {{$t("message.coins")}}</h3>
              <p class="time">{{item.createtime}}</p>
            </div>
            <div class="statusBox">
              <h4 v-if="item.state === '1'" style="color:#f2a638">{{$t("message.wallet.inPayment")}}</h4>
              <h4
                v-if="item.state === '2'"
                style="color:#e70031"
              >{{$t("message.wallet.paymentCompleted")}}</h4>
              <h4
                v-if="item.state === '3'"
                style="color:#e70031"
              >{{$t("message.wallet.paymentFailde")}}</h4>
            </div>
            <div v-if="item.state === '3'" class="reason">{{$t("message.Reason")}}: {{item.remark}}</div>
          </li>
        </ul>
      </div>
      <div v-if="nodatas" class="nodata">
        <img src="../../assets/images/default@2x.png">
        <p>{{$t("message.wallet.payNodata")}}</p>
        <div class="goShare" @click="jumpView('1')">{{$t("message.exchange.PayPalReward")}}</div>
      </div>
    </div>
    <v-foots></v-foots>
  </div>
</template>

<script>
import heads from "../Modules/heads";
import foots from "../Modules/foots";
import { InfiniteScroll } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "wallet",
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      // user id
      userid: "335428",
      // user token
      token: "b3622cba-3d62-4126-814b-cbb25d7d9c68",
      appv: "",
      // user select type
      chooseType: "income",
      selectType: "offers",
      // visit types
      type: 3,
      // page begin
      PageStart: 0,
      // page size
      PageSize: 10,
      // user's total gold
      totalgold: "--",
      // get gold by apprentice
      shitugold: "--",
      //get gold by task
      fenxianggold: "--",
      // get gold by other
      qitagold: "--",
      // other list
      // page begin
      otherStart: 0,
      otherList: "",
      otherDetailList: "",
      // invite list
      // page begin
      inviteStart: 0,
      inviteList: "",
      inviteDetailList: "",
      // offers list
      offersList: "",
      offersDetailList: "",
      ListDate: "",
      // nodata show status
      nodata: false,
      nodatas: false,
      exchangeList: "",
      // all exchange amont
      withdraw: "--",
      langType: "en_US"
    };
  },
  components: {
    vHeads: heads,
    vFoots: foots
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = "wallte";
    this.langType = this.$store.state.langType;
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === "en_US"
    ) {
      this.langType = "en_US";
      this.$i18n.locale = "en_US";
      document.title = "Records";
    } else if (this.langType === "zh_CN") {
      this.langType = "zh_CN";
      this.$i18n.locale = "zh_CN";
      document.title = "账本";
    } else {
      this.langType = "ms_MY";
      this.$i18n.locale = "ms_MY";
      document.title = "Rekod-rekod";
    }
    this.userid = this.$getUrlParam("userid");
    this.token = this.$getUrlParam("token");
    this.appv = this.$getUrlParam("infversionApp");
    let chooseType = this.$getUrlParam("chooseType");
    if (chooseType === "1") {
      this.select("expenses");
    }
    let expenses = localStorage.expenses;
    if (expenses === "expenses") {
      this.select("expenses");
      localStorage.expenses = "";
    }
    this.getWalletInfo();
    this.getOffersDetail();
  },
  methods: {
    jumpView(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.jumpView.postMessage(type);
      } else {
        window.taskCentre.jumpView(type);
      }
    },
    select(type) {
      this.chooseType = type;
      if (type === "expenses") {
        this.getExchageRecord();
      } else {
        this.choose("2", "offers");
      }
      this.nodata = false;
    },
    choose(type, choose) {
      this.type = type;
      this.selectType = choose;
      if (this.selectType === "offers") {
        this.getOffersDetail();
      } else {
        this.getListInfo();
      }
    },
    // get wallet heads show info
    getWalletInfo() {
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryUserIncomeTotalWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          //console.log(res)
          this.totalgold = res.data.totalgold;
          this.shitugold = res.data.shitugold;
          this.fenxianggold = res.data.fenxianggold;
          this.qitagold = res.data.qitagold;
        },
        res => {
          //console.log(res)
        }
      );
    },
    // get income list
    getListInfo() {
      this.nodata = false;
      if (this.type === "3") {
        this.PageStart = this.inviteStart;
        if (this.inviteList.length === 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
          return false;
        }
      } else if (this.type === "0") {
        this.PageStart = this.otherStart;
        if (this.otherList.length === 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
          return false;
        }
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        type: this.type,
        PageSize: this.PageSize,
        PageStart: this.PageStart,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryUserIncomeDayListWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          //console.log(res)
          if (this.type === "3") {
            this.inviteList = res.data;
            if (this.inviteList.length === 0) {
              this.nodata = true;
            } else {
              this.nodata = false;
              this.getDayDetails(this.inviteList[0].incometime);
              this.inviteStart = this.inviteList[
                this.inviteList.length - 1
              ].recordid;
            }
          } else if (this.type === "0") {
            this.otherList = res.data;
            if (this.otherList.length === 0) {
              this.nodata = true;
            } else {
              this.nodata = false;
              this.getDayDetails(this.otherList[0].incometime);
              this.otherStart = this.otherList[
                this.otherList.length - 1
              ].recordid;
            }
          }
        },
        res => {
          //console.log(res)
        }
      );
    },

    // load more invite list
    inviteMore() {
      if (this.inviteStart === 0) {
        return false;
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        type: "3",
        PageSize: this.PageSize,
        PageStart: this.inviteStart,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryUserIncomeDayListWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          //console.log(res)
          this.inviteList = this.inviteList.concat(res.data);
          this.inviteStart = this.inviteList[
            this.inviteList.length - 1
          ].recordid;
        },
        res => {
          //console.log(res)
        }
      );
    },

    // load more other list
    otherMore() {
      if (this.otherStart === 0) {
        return false;
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        type: "0",
        PageSize: this.PageSize,
        PageStart: this.otherStart,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryUserIncomeDayListWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          //console.log(res)
          this.otherList = this.otherList.concat(res.data);
          this.otherStart = this.otherList[this.otherList.length - 1].recordid;
        },
        res => {
          //console.log(res)
        }
      );
    },

    getDayDetails(time) {
      if (time === this.ListDate) {
        return false;
      }
      Indicator.open();
      this.ListDate = time;
      this.allDetailList = "";
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        type: this.type,
        incometime: time,
        i18n: this.langType,
        Method: "QueryUserIncomeDayDetailListWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          if (this.type === "3") {
            this.inviteDetailList = res.data;
          } else if (this.type === "0") {
            this.otherDetailList = res.data;
          }
          Indicator.close();
        },
        res => {
          Indicator.close();
          //console.log(res)
        }
      );
    },
    // get offers detail
    getOffersDetail() {
      this.nodata = false;
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryUserFenXiangDetailListWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.offersList = res.data;
          if (this.offersList.length === 0) {
            this.nodata = true;
          } else {
            this.nodata = false;
          }
        },
        res => {
          // console.log(res)
          this.nodata = true;
        }
      );
    },
    getExchageRecord() {
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        pagesize: this.PageSize,
        pagestart: this.PageStart,
        appv: this.appv,
        i18n: this.langType,
        Method: "QueryExchageRecordInfoWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          this.withdraw = res.data.tixianleiji;
          this.exchangeList = res.data.items;
          if (this.exchangeList.length === 0) {
            this.nodatas = true;
          } else {
            this.nodatas = false;
          }
        },
        res => {
          //console.log(res)
          this.nodatas = true;
        }
      );
    },
    commafy(num) {
      let iValue = num; //要转换的数字
      let sValue = iValue + "";
      let aValue = new Array();
      let iNum = sValue.length % 3;
      let aResult; //转换结果
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
        return aResult.toString(); //输出20,002,365,879
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wallet {
  background: #ffffff;
  padding: 0;
  margin: 0;
}
.header {
  width: 100vw;
  height: 0.93rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  border-bottom: 1px solid #eaeaea;
  h3 {
    width: 50%;
    height: 0.93rem;
    text-align: center;
    font-size: 0.32rem;
    color: #333333;
    line-height: 0.93rem;
  }
  .choose {
    width: 50%;
    height: 0.93rem;
    text-align: center;
    font-size: 0.32rem;
    color: #e61938;
    line-height: 0.93rem;
    position: relative;
  }
  .choose::after {
    content: "";
    position: absolute;
    width: 0.75rem;
    height: 0.06rem;
    background-color: #e61938;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  }
}
.onlyShow {
  width: 100%;
  height: 0.8rem;
  text-align: center;
  font-size: 0.26rem;
  line-height: 0.8rem;
  color: #bfbfbf;
  background: #f7f7f7;
}
.income {
  .allIncome {
    width: 100%;
    height: 1.8rem;
    padding-top: 0.35rem;
    text-align: center;
    p {
      font-size: 0.26rem;
      color: #333333;
    }
    h3 {
      margin-top: 0.35rem;
      font-size: 0.5rem;
      color: #e61937;
      font-weight: 700;
    }
  }
  .tabBox {
    width: 100vw;
    height: 1.66rem;
    padding-top: 0.32rem;
    background: #f7f7f7;
    .tables {
      width: 6.88rem;
      height: 1.2rem;
      margin: 0 auto;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      border-radius: 0.1rem;
      border: 1px solid #e61937;
      background: #ffffff;
      overflow: hidden;
      .typeBox {
        width: 33.333%;
        height: 1.2rem;
        padding: 0.18rem;
        color: #e61938;
        h3 {
          font-size: 0.26rem;
          text-align: center;
        }
        p {
          margin-top: 0.18rem;
          font-size: 0.3rem;
          text-align: center;
        }
      }
      .line {
        width: 1px;
        height: 1.2rem;
        background: #e61938;
      }
      .select {
        width: 33.333%;
        height: 1.2rem;
        background: #e61938;
        padding: 0.2rem;
        color: #ffffff;
        h3 {
          font-size: 0.26rem;
          text-align: center;
        }
        p {
          margin-top: 0.18rem;
          font-size: 0.3rem;
          text-align: center;
        }
      }
    }
  }
  .inviteDate {
    width: 100vw;
    height: 1.02rem;
    background-color: #f0eff5;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    padding: 0 0.3rem;
    border-bottom: 1px solid #eaeaea;
    h3 {
      width: 50%;
      font-size: 0.3rem;
      color: #333333;
      line-height: 1.02rem;
    }
    p {
      width: 50%;
      font-size: 0.28rem;
      color: #e51836;
      line-height: 1.02rem;
      text-align: end;
      padding-right: 0.5rem;
      position: relative;
      .show {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 50%;
        right: 0rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        background: url("../../assets/images/show.png");
        background-size: 100% 100%;
      }
      .hide {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 50%;
        right: 0rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        background: url("../../assets/images/hide.png");
        background-size: 100% 100%;
      }
    }
  }
  .inviteUl {
    width: 100vw;
    .inviteLi {
      width: 90%;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      margin: 0 auto;
      border-bottom: 1px solid #eaeaea;
      .contentBox {
        width: 80%;
        min-height: 1.56rem;
        padding: 0.4rem 0 0.32rem 0;
        h3 {
          font-size: 0.28rem;
          color: #333333;
        }
        p {
          font-size: 0.28rem;
          color: #777777;
          margin-top: 0.2rem;
        }
      }
      .goldNum {
        width: 20%;
        min-height: 1.56rem;
        font-size: 0.28rem;
        color: #333333;
        line-height: 1.56rem;
        text-align: end;
      }
      .imgBox {
        width: 20%;
        height: 2.54rem;
        position: relative;
        img {
          width: 100%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
      }
    }
  }
  .otherDate {
    width: 100vw;
    height: 1.02rem;
    background-color: #f0eff5;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    padding: 0 0.3rem;
    border-bottom: 1px solid #eaeaea;
    h3 {
      width: 50%;
      font-size: 0.3rem;
      color: #333333;
      line-height: 1.02rem;
    }
    p {
      width: 50%;
      font-size: 0.28rem;
      color: #e51836;
      line-height: 1.02rem;
      text-align: end;
      position: relative;
      padding-right: 0.5rem;
      position: relative;
      .show {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 50%;
        right: 0rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        background: url("../../assets/images/show.png");
        background-size: 100% 100%;
      }
      .hide {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 50%;
        right: 0rem;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        background: url("../../assets/images/hide.png");
        background-size: 100% 100%;
      }
    }
  }
  .otherUl {
    width: 100vw;
    .otherLi {
      width: 90%;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      margin: 0 auto;
      border-bottom: 1px solid #eaeaea;
      .contentBox {
        width: 80%;
        min-height: 1.56rem;
        padding: 0.4rem 0 0.32rem 0;
        h3 {
          font-size: 0.28rem;
          color: #333333;
        }
        p {
          font-size: 0.28rem;
          color: #777777;
          margin-top: 0.2rem;
        }
      }
      .goldNum {
        width: 20%;
        min-height: 1.56rem;
        font-size: 0.28rem;
        color: #333333;
        line-height: 1.56rem;
        text-align: end;
      }
      .imgBox {
        width: 20%;
        height: 2.54rem;
        position: relative;
        img {
          width: 100%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
      }
    }
  }
  .offersDate {
    width: 100vw;
    height: 1.02rem;
    background-color: #ffffff;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    padding: 0 0.3rem;
    border-bottom: 1px solid #eaeaea;
    h3 {
      width: 50%;
      font-size: 0.3rem;
      color: #333333;
      line-height: 1.02rem;
    }
    p {
      width: 50%;
      font-size: 0.28rem;
      color: #e51836;
      line-height: 1.02rem;
      text-align: end;
    }
  }
  .offersUl {
    width: 100vw;
    background: #f0eff5;
    .offersLi {
      width: 90%;
      height: 2.4rem;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      margin: 0 auto;
      border-bottom: 1px solid #eaeaea;
      .imgBox {
        width: 20%;
        height: 2.4rem;
        position: relative;
        img {
          width: 100%;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
      }
      .contents {
        width: 80%;
        height: 2.4rem;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        flex-wrap: wrap;
        .textBox {
          width: 80%;
          height: 1.5rem;
          padding-top: 0.4rem;
          padding-left: 0.3rem;
          h3 {
            font-size: 0.28rem;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            height: 0.65rem;
            line-height: 0.3rem;
            overflow-y: hidden;
          }
          p {
            font-size: 0.28rem;
            color: #777777;
            margin-top: 0.2rem;
          }
        }
        .goldNum {
          width: 20%;
          height: 1.5rem;
          font-size: 0.28rem;
          color: #333333;
          line-height: 1.5rem;
          text-align: end;
        }
        .readBox {
          width: 100%;
          font-size: 0.28rem;
          color: #e61937;
          padding-left: 0.2rem;
        }
      }
    }
  }
}
.nodata {
  width: 100%;
  height: 4.12rem;
  margin-top: 0.5rem;
  img {
    height: 1.37rem;
    display: block;
    margin: 0 auto;
  }
  p {
    font-size: 0.3rem;
    margin-top: 0.6rem;
    color: #bfbfbf;
    text-align: center;
  }
  .goShare {
    width: 4.13rem;
    height: 0.82rem;
    background-color: #e61937;
    color: #ffffff;
    text-align: center;
    line-height: 0.82rem;
    margin: 0.7rem auto 0;
    border-radius: 0.1rem;
    font-size: 0.3rem;
  }
}

.expenses {
  width: 100%;
  .vomit {
    width: 100%;
    height: 1.9rem;
    background: #efeef3;
    padding-top: 0.3rem;
    .allExpenses {
      width: 100%;
      height: 1.3rem;
      display: flex;
      display: -webkit-flex;
      display: -webkit-box;
      background: #ffffff;
      h3 {
        width: 50%;
        height: 1.27rem;
        font-size: 0.28rem;
        color: #333333;
        padding-left: 0.2rem;
        position: relative;
        p {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
        }
      }
      h4 {
        width: 50%;
        height: 1.27rem;
        font-size: 0.3rem;
        color: #e70034;
        line-height: 1.27rem;
        padding-right: 0.2rem;
        text-align: end;
      }
    }
  }
  .expensesList {
    width: 100%;
    ul {
      width: 100%;
      li {
        width: 100%;
        // height: 1.73rem;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        flex-wrap: wrap;
        .imgBox {
          width: 15%;
          height: 1.73rem;
          overflow: hidden;
          position: relative;
          img {
            display: block;
            width: 0.7rem;
            max-height: 1.12rem;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            left: 60%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
          }
        }
        .contentBox {
          width: 45%;
          height: 1.73rem;
          padding: 0 0 0 0.2rem;
          .title {
            color: #333333;
            width: 4rem;
            height: 0.32rem;
            margin-top: 0.35rem;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.3rem;
            line-height: 0.3rem;
            span {
              color: #e61937;
            }
          }
          .content {
            color: #777777;
            margin-top: 0.15rem;
            font-size: 0.24rem;
          }
          .time {
            color: #777777;
            margin-top: 0.1rem;
            font-size: 0.24rem;
          }
        }
        .statusBox {
          width: 40%;
          height: 1.73rem;
          padding-right: 0.2rem;
          text-align: end;
          h4 {
            font-size: 0.26rem;
            color: #333333;
            line-height: 1.73rem;
          }
        }
      }
      .reason {
        width: 100%;
        font-size: 0.24rem;
        line-height: 0.32rem;
        padding: 0 0.2rem 0.1rem 0.2rem;
        padding-bottom: 0.1rem;
        margin-top: -0.2rem;
        color: #777777;
      }
    }
  }
}
</style>
