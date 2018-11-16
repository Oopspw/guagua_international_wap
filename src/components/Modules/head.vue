<template>
  <div v-title="$route.meta.title">
    <div class="head">{{ $route.meta.title }}</div>
    <div class="nullBox"></div>
  </div>
</template>

<script>
export default {
  name: 'head',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  width: 100vw;
  height: 1rem;
  background: #fff;
  font-size: 0.32rem;
  line-height: 1rem;
  text-align: center;
  z-index: 10000;
}
.nullBox {
  width: 100vw;
  height: 1rem;
}
</style>

