<template>
  <div>
    <div class="contentBody" v-html="content"></div>
  </div>
</template>
<script>
export default {
  // 使用时请使用 :url.sync=""传值
  props: {
    url: {
      required: true
    }
  },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    url(value) {
      this.load(value)
    }
  },
  mounted() {
    this.load(this.url)
  },
  methods: {
    // 提示框公用方法
    showWarnTips(text) {
      this.warn_type = 1
      this.warn_content = text
      setTimeout(() => {
        this.warn_type = 0
      }, 2000)
    },
    load(url) {
      if (url && url.length > 0) {
        // 加载中
        let param = {}
        this.$axios
          .get(url, param)
          .then(response => {
            // 处理HTML显示
            this.content = response.data
          })
          .catch(() => {
            this.showWarnTips('加载失败')
          })
      }
    }
  }
}
</script>
<style lang="less">
.contentBody {
  font-size: 0.3rem;
  padding: 0.2rem;
  margin: 0;
  .article-title {
    font-size: 0.5rem;
    line-height: 0.52rem;
    padding-left: 0.2rem;
    color: #111111;
  }
  .articleInfo {
    margin-bottom: 0.2rem;
  }
  .time {
    width: 60%;
    padding-left: 0.2rem;
    #time {
      font-size: 0.3rem;
    }
  }
  .reader {
    width: 40%;
    .complain {
      font-size: 0.3rem;
    }
    .hitIcon {
      display: inline-block;
      width: 0.35rem;
      height: 0.4rem;
      vertical-align: bottom;
    }
  }
  p {
    font-size: 0.3rem;
    line-height: 0.42rem;
  }
  .new_tip {
    font-size: 0.26rem;
  }
  .share_box {
    padding-top: 0.4rem;
    height: auto;
    .share_title {
      font-size: 0.36rem;
      height: auto;
    }
    .share_ul {
      width: 100%;
      padding: 0.6rem 0rem;
      text-align: center;
      li {
        display: inline-block;
        width: 23.5%;
        text-align: center;
        div {
          display: inline-block;
          width: 1rem;
          height: 1rem;
        }
        p {
          font-size: 0.3rem;
          line-height: 0.42rem;
        }
      }
    }
  }
}
</style>
