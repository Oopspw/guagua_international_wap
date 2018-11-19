<template>
  <div v-title="$route.meta.title">
    <v-head></v-head>
    <v-footer></v-footer>
  </div>
</template>

<script>

import head from '../Modules/head'
import footer from '../Modules/footer'
export default {
  name: 'articleList',
  data() {
    return {
      url: ''
    }
  },
  components: {
    vHead: head,
    vFooter: footer
  }
}
</script>

<style lang="less" scoped>
</style>

