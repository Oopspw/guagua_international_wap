<template>
  <div v-title="$route.meta.title">
    <div class="heads">
      <!-- {{ $route.meta.title }} -->
      <img class="invite" src="../../assets/images/header/icon_invite@2x.png" alt="">
      <img class="indexTitle" src="../../assets/images/header/Readward@2x.png" alt="">
      <img class="query" src="../../assets/images/header/query@2x.png" alt="">
    </div>
    <div class="nullBox"></div>
  </div>
</template>

<script>
export default {
  name: 'heads',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.heads {
  position: fixed;
  width: 100vw;
  height: 1rem;
  background: #fff;
  font-size: 0.32rem;
  line-height: 1rem;
  text-align: center;
  z-index: 10000;
  border-bottom: 1px solid #ededed;
  img {
    position: absolute;
    display: block;
    height: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }
  .indexTitle {
    height: 0.3rem;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .invite {
    left: 0.3rem;
  }
  .query {
    right: 0.3rem;
  }
}
.nullBox {
  width: 100vw;
  height: 1rem;
}
</style>

