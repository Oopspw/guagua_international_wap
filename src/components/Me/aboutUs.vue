<template>
  <div v-title="$route.meta.title">
    <v-head></v-head>
    <div class="about">
      <img class="readWard" src="../../assets/images/Readward.png">
      <h1 class="Rtitle">Readward</h1>
      <h3>{{$t("message.aboutUs.Notice")}}</h3>
      <p>{{$t("message.aboutUs.noticeContent")}}</p>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import head from '../Modules/head'
import footer from '../Modules/footer'
export default {
  name: 'aboutUs',
  data() {
    return {
      langType: 'en_US'
    }
  },
  components: {
    vHead: head,
    vFooter: footer
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = 'aboutUs'
    this.langType = this.$store.state.langType
    if (
      this.langType === null ||
      this.langType === undefined ||
      this.langType === 'en_US'
    ) {
      this.langType = 'en_US'
      this.$i18n.locale = 'en_US'
      document.title = 'About Readward'
    } else if (this.langType === 'zh_CN') {
      this.langType = 'zh_CN'
      this.$i18n.locale = 'zh_CN'
      document.title = '关于我们'
    } else {
      this.langType = 'ms_MY'
      this.$i18n.locale = 'ms_MY'
      document.title = 'Kira-kira Readward'
    }
  }
}
</script>

<style lang="less">
@charset 'utf-8';
@font-face {
  font-family: 'font_a';
  src: url('../../assets/fonts/ERASB.ttf') format('truetype');
}
@font-face {
  font-family: 'font_b';
  src: url('../../assets/fonts/PINGFANGREGULAR.ttf') format('truetype');
}
.aboutUs {
  background-color: #f0eff5;
}
.about {
  padding: 0.8rem 0.3rem 0.3rem 0.3rem;
  .readWard {
    width: 1.33rem;
    height: 1.33rem;
    display: block;
    margin: 0 auto 0.26rem;
  }
  .Rtitle {
    font-size: 0.34rem;
    font-family: 'font_a';
    font-weight: 700;
    color: #e41936;
    text-align: center;
  }
  h3 {
    font-size: 0.3rem;
    color: #333333;
    margin-top: 0.8rem;
  }
  p {
    font-size: 0.3rem;
    font-family: 'font_b';
    color: #4b4b4d;
    line-height: 0.5rem;
    margin-top: 0.6rem;
  }
}
</style>
