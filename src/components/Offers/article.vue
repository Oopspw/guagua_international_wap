<template>
  <div>
    <v-head></v-head>
    <!-- 加载文章内容 -->
    <v-html-panel :url.asyc="url"></v-html-panel>
    <v-footer></v-footer>
  </div>
</template>
<style>
</style>
<script>
import head from "../Modules/head";
import footer from "../Modules/footer";
import artContent from "../../components/Offers/content";
export default {
  name: "footer",
  data() {
    return {
      url:
        "http://app-articledetail.zongmiaoqiuxu.cn/app-articledetail/aarticle?userid=335453&articleid=16037"
    };
  },
  components: {
    vHead: head,
    vFooter: footer,
    // 文章内容
    vHtmlPanel: artContent
  }
};
</script>
