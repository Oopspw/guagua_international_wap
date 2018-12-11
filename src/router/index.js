import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(Router)
Vue.use(VueResource)
export default new Router({
  mode: 'history',
  routes: [
    // 功能组件
    {
      path: '/heads',
      name: 'heads',
      component: resolve => require(['components/Modules/heads.vue'], resolve),
      meta: {
        title: 'Withdraw'
      }
    },
    {
      path: '/foots',
      name: 'foots',
      component: resolve => require(['components/Modules/foots.vue'], resolve),
      meta: {
        title: 'Withdraw'
      }
    },
    // 我的页面
    {
      path: '/userIndex',
      name: 'userIndex',
      component: resolve => require(['components/Me/index.vue'], resolve),
      meta: {
        title: 'Me'
      }
    },
    {
      path: '/googleLoad',
      name: 'googleLoad',
      component: resolve => require(['components/Me/googleLoad.vue'], resolve),
      meta: {
        title: 'Me'
      }
    },
    {
      path: '/facebookLoad',
      name: 'facebookLoad',
      component: resolve =>
        require(['components/Me/facebookLoad.vue'], resolve),
      meta: {
        title: 'Me'
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: resolve => require(['components/Me/aboutUs.vue'], resolve),
      meta: {
        title: 'About Readward'
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: resolve => require(['components/Me/wallet.vue'], resolve),
      meta: {
        title: 'Records'
      }
    },
    {
      path: '/inviteCode',
      name: 'inviteCode',
      component: resolve => require(['components/Me/inviteCode.vue'], resolve),
      meta: {
        title: 'Enter Invitation Code'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: resolve => require(['components/Me/privacy.vue'], resolve),
      meta: {
        title: 'Privacy'
      }
    },
    // 邀请页面
    {
      path: '/money',
      name: 'money',
      component: resolve => require(['components/Invite/money.vue'], resolve),
      meta: {
        title: 'Invite'
      }
    },
    {
      path: '/inviteFriend',
      name: 'inviteFriend',
      component: resolve =>
        require(['components/Invite/inviteFriend.vue'], resolve),
      meta: {
        title: 'My Friends'
      }
    },
    // 兑换
    {
      path: '/exchange',
      name: 'exchange',
      component: resolve =>
        require(['components/Rewards/exchange.vue'], resolve),
      meta: {
        title: 'Rewards'
      }
    },
    {
      path: '/extract',
      name: 'extract',
      component: resolve =>
        require(['components/Rewards/extract.vue'], resolve),
      meta: {
        title: 'Withdraw'
      }
    },
    // Offers 文章 文章列表
    {
      path: '/articleList',
      name: 'articleList',
      component: resolve =>
        require(['components/Offers/articleList.vue'], resolve),
      meta: {
        title: 'Rewards'
      }
    },
    {
      path: '/article',
      name: 'article',
      component: resolve => require(['components/Offers/article.vue'], resolve),
      meta: {
        title: 'Rewards'
      }
    },
    {
      path: '/share',
      name: 'share',
      component: resolve => require(['components/Offers/share.vue'], resolve),
      meta: {
        title: 'Rewards'
      }
    }
  ]
})
