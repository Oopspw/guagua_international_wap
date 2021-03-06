// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 引入路由
import Vuex from 'vuex' // vuex状态管理
import store from './vuex/store'
import packaging from './common/js/packaging' // 自定义封装方法
// 引入初始化css
import './common/css/public.css'
import './common/css/style.css'
import './assets/js/rem.js'
// 文章详情
import artContent from '../src/components/Offers/content.vue'
import MintUI from 'mint-ui'
import VueAnalytics from 'vue-analytics' // google Analytics 事件统计
import VueI18n from 'vue-i18n' // 多语言
import Axios from 'axios'
// 引入语言包
import en from '../static/lang/en_US'
import zh from '../static/lang/zh_CN'
import ms from '../static/lang/ms_MY'
// 分享插件
import SocialSharing from 'vue-social-sharing'
Vue.use(SocialSharing)
Vue.prototype.$axios = Axios
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en_US',
  messages: {
    en_US: en,
    zh_CN: zh,
    ms_MY: ms
  }
})
Vue.use(VueAnalytics, {
  id: 'UA-126505686-1', // google Analytics 统计id
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
Vue.use(Vuex)
Vue.use(packaging)
Vue.use(MintUI)
Vue.use(artContent)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
// 注册标题更换全局指令
Vue.directive('title', {
  inserted (el, binding) {
    document.title = binding.value
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'display: none; width: 0; height: 0;'
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener)
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }, 0)
    }
    iframe.addEventListener('load', listener)
    document.body.appendChild(iframe)
  }
})
