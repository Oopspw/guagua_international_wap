<template>
  <div v-title="$route.meta.title">
    <v-Heads></v-Heads>
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
    <v-foots></v-foots>
  </div>
</template>

<script>
import heads from "../Modules/heads";
import foots from "../Modules/foots";
export default {
  name: "articleList",
  data() {
    return {
      url: ""
    };
  },
  components: {
    vHeads: heads,
    vFoots: foots
  }
};
</script>

<style lang="less" scoped>
</style>

