<template>
  <div v-title="$route.meta.title">
    <div class="nullBox"></div>
    <div class="footer" v-if="this.$store.state.langType === 'zh_CN'">
      <div class="chooseBox" @click="checkPage(1)">
        <img v-if="this.$store.state.pageType === 1" src="../../assets/images/footer/zh/2_1task@2x.png">
        <img v-else src="../../assets/images/footer/zh/2_task@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(2)">
        <img v-if="this.$store.state.pageType === 2" src="../../assets/images/footer/zh/2_1Invite@2x.png">
        <img v-else src="../../assets/images/footer/zh/2_Invite@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(3)">
        <img v-if="this.$store.state.pageType === 3" src="../../assets/images/footer/zh/2_1Rewards@2x.png">
        <img v-else src="../../assets/images/footer/zh/2_Rewards@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(4)">
        <img v-if="this.$store.state.pageType === 4" src="../../assets/images/footer/zh/2_1Me@2x.png">
        <img v-else src="../../assets/images/footer/zh/2_Me@2x.png">
      </div>
    </div>
    <div class="footer" v-if="this.$store.state.langType === 'en_US'">
      <div class="chooseBox" @click="checkPage(1)">
        <img v-if="this.$store.state.pageType === 1" src="../../assets/images/footer/en/task@2x.png">
        <img v-else src="../../assets/images/footer/en/task2@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(2)">
        <img v-if="this.$store.state.pageType === 2" src="../../assets/images/footer/en/Invite@2x.png">
        <img v-else src="../../assets/images/footer/en/Invite2@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(3)">
        <img v-if="this.$store.state.pageType === 3" src="../../assets/images/footer/en/Rewards@2x.png">
        <img v-else src="../../assets/images/footer/en/Rewards2@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(4)">
        <img v-if="this.$store.state.pageType === 4" src="../../assets/images/footer/en/Me@2x.png">
        <img v-else src="../../assets/images/footer/en/Me2@2x.png">
      </div>
    </div>
    <div class="footer" v-if="this.$store.state.langType === 'ms_MY'">
      <div class="chooseBox" @click="checkPage(1)">
        <img v-if="this.$store.state.pageType === 1" src="../../assets/images/footer/ms/Tawaran@2x.png">
        <img v-else src="../../assets/images/footer/ms/2Tawaran@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(2)">
        <img v-if="this.$store.state.pageType === 2" src="../../assets/images/footer/ms/Jemputan@2x.png">
        <img v-else src="../../assets/images/footer/ms/2Jemputan@2x .png">
      </div>
      <div class="chooseBox" @click="checkPage(3)">
        <img v-if="this.$store.state.pageType === 3" src="../../assets/images/footer/ms/Ganjaran@2x.png">
        <img v-else src="../../assets/images/footer/ms/2Ganjaran@2x.png">
      </div>
      <div class="chooseBox" @click="checkPage(4)">
        <img v-if="this.$store.state.pageType === 4" src="../../assets/images/footer/ms/Saya@2x.png">
        <img v-else src="../../assets/images/footer/ms/2Saya@2x.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    checkPage(type) {
      this.$store.state.pageType = type
      if (this.$store.state.pageType === 1) {
        this.$router.push({ path: '/articleList' })
      } else if (this.$store.state.pageType === 2) {
        this.$router.push({ path: '/money' })
      } else if (this.$store.state.pageType === 3) {
        this.$router.push({ path: '/exchange' })
      } else {
        this.$router.push({ path: '/aboutUs' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 1rem;
  background: #fff;
  border-top: 1px solid #ededed;
  z-index: 10000;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  .chooseBox {
    width: 25%;
    height: 1rem;
    img {
      display: block;
      margin: 0.15rem auto 0;
      height: 0.76rem;
    }
  }
}
.nullBox {
  width: 100vw;
  height: 1.05rem;
}
</style>

