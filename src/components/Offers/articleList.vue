<template>
  <div v-title="$route.meta.title">
    <v-head></v-head>
    <!-- 文章列表 -->
    <div class="articleList">
      <ul class="articleUl">
        <!-- 单图文章 -->
        <li class="articleLi">
          <div class="articleInfo">
            <div class="imgBox">
              <img src>
            </div>
            <div class="contentBox">
              <h3>ACTICLE TITLE</h3>
            </div>
          </div>
        </li>
        <!-- 三图文章 -->
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import head from "../Modules/head";
import footer from "../Modules/footer";
export default {
  name: "articleList",
  data() {
    return {
      url: ""
    };
  },
  components: {
    vHead: head,
    vFooter: footer
  }
};
</script>

<style lang="less" scoped>
</style>

