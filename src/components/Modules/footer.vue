<template>
  <div v-title="$route.meta.title">
    <div class="nullBox"></div>
    <div class="footer">
      <div class="chooseBox">
        <img src="../../assets/images/footer/2_1task@2x.png" alt="">
      </div>
      <div class="chooseBox">
        <img src="../../assets/images/footer/2_1Invite@2x.png" alt="">
      </div>
      <div class="chooseBox">
        <img src="../../assets/images/footer/2_Rewards@2x.png" alt="">
      </div>
      <div class="chooseBox">
        <img src="../../assets/images/footer/2_Me@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {}
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

