<template>
  <div v-title="$route.meta.title">
    <v-Heads></v-Heads>
    <div class="bottom">
      <img src="../../assets/images/background3@2x.png">
    </div>
    <div class="info">
      <div class="left">
        <h2>{{$t("message.inviteFriend.allFriend")}}</h2>
        <p>{{allFirend}}</p>
      </div>
      <div class="line"></div>
      <div class="right">
        <h2>{{$t("message.inviteFriend.CumulativeReward")}}</h2>
        <p>{{ commafy(allReword) }}</p>
      </div>
    </div>
    <div class="nullBox"></div>
    <div class="list">
      <ul
        class="inviteUl"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li class="master" v-if="masterName!==''">
          <div class="imgBox">
            <img v-if="masterImg !== ''" :src="masterImg">
            <img v-else src="../../assets/images/icon.png">
            <div class="imgBox_son">{{$t("message.inviteFriend.myInviter")}}</div>
          </div>
          <div class="contentBox">
            <h3>{{ masterName }}</h3>
            <p>{{ masterDate }}</p>
          </div>
        </li>
        <li class="inviteLi" v-for="item in list">
          <div class="imgBox">
            <img v-if="item.friendphoto !==''" :src="item.friendphoto">
            <img v-else src="../../assets/images/icon.png">
          </div>
          <div class="contentBox">
            <h3>{{item.friendname}}</h3>
            <p>{{item.frienddate}}</p>
          </div>
          <div class="coins">
            <p
              v-if="item.gold ===0 ||item.gold === '0'||item.gold === ''"
              :class="langType==='en_US'?'en':'ch'"
            >+{{ rewardparent }}{{$t("message.inviteFriend.words")}}</p>
            <p v-else class="init">+{{ item.gold }}</p>
          </div>
          <div
            v-if="item.gold ===0 ||item.gold === '0'||item.gold === ''"
            class="tips"
          >{{$t("message.inviteFriend.tips")}}</div>
        </li>
      </ul>
    </div>
    <div class="noMore" v-if="showBottom === 0">
      <img src="../../assets/images/default@2x.png">
      <h3>{{$t("message.inviteFriend.nullTip")}}</h3>
    </div>
    <div class="boundries" v-if="showBottom">
      <h3>{{$t("message.inviteFriend.noMore")}}</h3>
    </div>
    <div class="warn" v-if="warn_type===1">
      <p>{{warn_content}}</p>
    </div>
    <v-Foots></v-Foots>
  </div>
</template>

<script>
import heads from "../Modules/heads";
import foots from "../Modules/foots";
export default {
  name: "inviteFriend",
  data() {
    return {
      url: window.config.api.apiUrl,
      Infversion: window.config.api.Infversion,
      // user id
      userid: "335428",
      // user token
      token: "b3622cba-3d62-4126-814b-cbb25d7d9c68",
      appv: "1.0",
      list: [],
      allFirend: "--",
      allReword: "--",
      masterName: "",
      masterImg: "",
      masterDate: "",
      pagesize: 10,
      pagestart: 1,
      warn_content: "",
      warn_type: 0,
      showBottom: 0,
      langType: "en_US",
      rewardparent: "0"
    };
  },
  components: {
    vHeads: heads,
    vFoots: foots
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = "inviteFriend";
    this.langType = this.$store.state.langType;
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === "en_US"
    ) {
      this.langType = "en_US";
      this.$i18n.locale = "en_US";
      document.title = "My Friends";
    } else if (this.langType === "zh_CN") {
      this.langType = "zh_CN";
      this.$i18n.locale = "zh_CN";
      document.title = "我的好友";
    } else {
      this.langType = "ms_MY";
      this.$i18n.locale = "ms_MY";
      document.title = "teman-temanku";
    }
    this.userid = this.$getHashParameter("userid");
    this.token = this.$getHashParameter("token");
    this.appv = this.$getHashParameter("infversionApp");
    this.getInviteFriendInfo();
    this.showLeftBtn("yes");
  },
  methods: {
    // show left bottom
    showLeftBtn(type) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.showLeftBtn.postMessage(type);
      } else {
        window.taskCentre.showLeftBtn(type);
      }
    },
    getInviteFriendInfo() {
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        pagesize: this.pagesize,
        pagestart: this.pagestart,
        i18n: this.langType,
        Method: "QueryMyInviteFriendWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.masterName = res.data.parentname;
          this.masterImg = res.data.parentphoto;
          this.masterDate = res.data.parentdate;
          this.allFirend = res.data.inviteqty;
          this.allReword = res.data.totalgold;
          this.rewardparent = res.data.rewardparent;
          this.list = res.data.fiendlist;
          if (this.list.length <= 10) {
            this.showBottom = true;
            this.pagestart++;
          } else {
            this.showBottom = true;
            this.pagestart++;
          }
          if (this.masterName === "" && this.list.length === 0) {
            this.showBottom = 0;
          }
        },
        res => {
          console.log(res);
          this.showWarnTips(res.msg.substr(2));
        }
      );
    },
    loadMore() {
      if (this.pagestart === 1) {
        return false;
      }
      let url = this.url;
      let data = {
        userid: this.userid,
        token: this.token,
        Infversion: this.Infversion,
        appv: this.appv,
        i18n: this.langType,
        pagesize: this.pagesize,
        pagestart: this.pagestart,
        Method: "QueryMyInviteFriendWap"
      };
      this.$apiPost(
        url,
        data,
        res => {
          // console.log(res)
          this.list = this.list.concat(res.data.fiendlist);
          if (this.list.length <= 10) {
            this.showBottom = true;
            this.pagesize++;
          } else {
            this.showBottom = false;
            this.pagesize++;
          }
          if (this.masterName === "" && this.list.length === 0) {
            this.showBottom = 0;
          }
        },
        res => {
          // console.log(res)
          this.showWarnTips(res.msg.substr(2));
        }
      );
    },
    // 提示框公用方法
    showWarnTips(text) {
      this.warn_type = 1;
      this.warn_content = text;
      setTimeout(() => {
        this.warn_type = 0;
      }, 2000);
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
        return aResult.toString();
      }
    }
  }
};
</script>

<style lang="less">
.inviteFriend {
  background: #f0eff5;
}
.bottom {
  width: 100vw;
  height: 1.27rem;
  img {
    width: 100%;
    height: 1.27rem;
  }
}
.info {
  position: fixed;
  width: 6.97rem;
  height: 1.83rem;
  background-color: #ffffff;
  border-radius: 0.2rem;
  top: 0.42rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  z-index: 100;
  .left {
    width: 50%;
    height: 1.83rem;
    padding-top: 0.46rem;
    h2 {
      font-size: 0.26rem;
      text-align: center;
      color: #333333;
      height: 0.5rem;
    }
    p {
      margin-top: 0.28rem;
      font-size: 0.34rem;
      text-align: center;
      color: #e60033;
    }
  }
  .right {
    width: 50%;
    height: 1.83rem;
    padding-top: 0.46rem;
    h2 {
      font-size: 0.26rem;
      text-align: center;
      color: #333333;
      height: 0.5rem;
    }
    p {
      margin-top: 0.28rem;
      font-size: 0.34rem;
      text-align: center;
      color: #e60033;
    }
  }
  .line {
    position: absolute;
    width: 1px;
    height: 0.5rem;
    border-left: 1px dashed #d5d5d5;
    left: 50%;
    top: 0.66rem;
  }
}
.nullBox {
  width: 100%;
  height: 1.28rem;
}
.list {
  width: 7.04rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
  overflow-y: scroll;
  ul {
    width: 100%;
    li {
      width: 100%;
      // height: 1.71rem;
      display: flex;
      display: -webkit-box;
      display: -webkit-flex;
      border-bottom: 1px solid #eaeaea;
      padding: 0 0.27rem 0 0.36rem;
      flex-wrap: wrap;
      .imgBox {
        width: 15%;
        height: 1.71rem;
        img {
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          margin: 0.45rem auto 0;
          border-radius: 50%;
        }
      }
      .contentBox {
        width: 45%;
        height: 1.71rem;
        padding: 0 0.2rem;
        h3 {
          height: 0.3rem;
          font-size: 0.3rem;
          margin-top: 0.45rem;
          color: #333333;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          font-size: 0.26rem;
          margin-top: 0.2rem;
          color: #777777;
        }
      }
      .coins {
        width: 40%;
        height: 1.71rem;
        font-size: 0.28rem;
        .init {
          width: 1.63rem;
          height: 0.68rem;
          background: #e61937;
          text-align: center;
          line-height: 0.68rem;
          color: #ffffff;
          margin: 0.5rem auto 0;
          border-radius: 0.1rem;
        }
        .ch {
          height: 0.68rem;
          background: #e61937;
          text-align: center;
          line-height: 0.68rem;
          color: #ffffff;
          margin: 0.5rem auto 0;
          border-radius: 0.1rem;
        }
        .en {
          height: 0.68rem;
          background: #e61937;
          text-align: center;
          color: #ffffff;
          padding-top: 0.1rem;
          font-size: 0.24rem;
          margin: 0.5rem auto 0;
          border-radius: 0.1rem;
        }
      }
      .tips {
        width: 100%;
        font-size: 0.26rem;
        padding-bottom: 0.2rem;
        text-align: left;
        color: #777777;
        padding-left: 1.2rem;
        margin-top: -0.2rem;
        line-height: 0.26rem;
      }
    }
    .master {
      width: 100%;
      height: 1.75rem;
      background: url("../../assets/images/background3@2x.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 0.2rem 0.2rem 0 0;
      border: none;
      .imgBox {
        width: 25%;
        height: 1.71rem;
        position: relative;
        img {
          display: block;
          width: 0.93rem;
          height: 0.93rem;
          margin: 0.4rem auto 0;
          border: 0.02rem solid #ffffff;
          border-radius: 50%;
        }
        .imgBox_son {
          position: absolute;
          width: 1.6rem;
          height: 0.45rem;
          background: url("../../assets/images/icon_1@2x.png") no-repeat;
          background-size: 100% 100%;
          font-size: 0.2rem;
          color: #ffffff;
          text-align: center;
          line-height: 0.52rem;
          bottom: 0.18rem;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
        }
      }
      .contentBox {
        width: 45%;
        height: 1.71rem;
        padding-left: 0.2rem;
        h3 {
          font-size: 0.3rem;
          margin-top: 0.45rem;
          color: #ffffff;
        }
        p {
          font-size: 0.26rem;
          margin-top: 0.2rem;
          color: #ffffff;
        }
      }
      .coins {
        width: 30%;
        height: 1.71rem;
        font-size: 0.28rem;
        p {
          width: 1.63rem;
          height: 0.68rem;
          background: #ffffff;
          text-align: center;
          line-height: 0.68rem;
          color: #e61937;
          margin: 0.5rem auto 0;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
.list::-webkit-scrollbar {
  width: 0 !important;
}
.noMore {
  width: 7.04rem;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 0.2rem;
  padding: 1.4rem 0;
  img {
    display: block;
    width: 0.63rem;
    margin: 0 auto;
  }
  h3 {
    font-size: 0.3rem;
    margin-top: 0.78rem;
    text-align: center;
  }
}
.boundries {
  width: 100%;
  height: 1rem;
  padding-top: 0.3rem;
  h3 {
    font-size: 0.28rem;
    text-align: center;
    line-height: 1rem;
    position: relative;
    color: #707070;
  }
  h3::before {
    content: "";
    position: absolute;
    width: 1.05rem;
    height: 1px;
    background-color: #dcdbe3;
    top: 0.5rem;
    left: 1.3rem;
  }
  h3::after {
    content: "";
    position: absolute;
    width: 1.05rem;
    height: 1px;
    background-color: #dcdbe3;
    top: 0.5rem;
    right: 1.3rem;
  }
}
</style>
