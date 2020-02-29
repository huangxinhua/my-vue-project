import Vue from 'vue'
import Router from 'vue-router'
import studyTest from './modules/studyTest'

import MockDataUse from '@/components/MockDataUse'
import Button from '@/components/elem/Button.vue'
import Login from '@/components/page/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 引入方式的router
    studyTest,
    {
      path: '/',
      name: 'first',
      component: MockDataUse
    },
    {
      path: '/Button',
      name: 'Button',
      component: Button
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('../components/study/slot/Myslot.vue')
    },
    {
      // 懒加载方式
      path: '/manager',
      name: 'manager',
      component: () => import('@/components/page/Manager.vue'),
      children: [{
        path: '',
        component: () => import('@/components/page/Home.vue'),
        meta: []
      }, {
        path: '/userlist',
        component: () => import('../components/page/UserList.vue'),
        meta: ['用户数据', 'user data']
      }]
    }
  ]
})
