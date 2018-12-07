<template>
  <div>
    <v-Heads></v-Heads>
    <!-- 加载文章内容 -->
    <v-html-panel :url.asyc="url"></v-html-panel>
    <v-foots></v-foots>
  </div>
</template>
<style>
</style>
<script>
import heads from "../Modules/heads";
import foots from "../Modules/foots";
import artContent from "../../components/Offers/content";
export default {
  name: "foots",
  data() {
    return {
      url:
        "http://app-articledetail.zongmiaoqiuxu.cn/app-articledetail/aarticle?userid=335453&articleid=16037"
    };
  },
  components: {
    vHeads: heads,
    vFoots: foots,
    // 文章内容
    vHtmlPanel: artContent
  }
};
</script>
