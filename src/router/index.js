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
      path: '/Button',
      name: 'Button',
      component: Button
    },
    {
      path: '/',
      name: 'Login',
      component: Login
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
        }, {
          path: '/slot',
          name: 'slot',
          component: () => import('../components/study/slot/Myslot.vue'),
          meta: ['插槽']
        },
        {
          path: '/nest',
          name: 'nest',
          component: () => import('../components/study/nest/nest-dispaly.vue'),
          meta: ['嵌套']
        },
        {
          path: '/draggable',
          component: () => import('@/components/study/draggable/banner.vue'),
          name: 'draggable',
          meta: {},
        },
        {
          path: '/mockDataUse',
          name: 'mockDataUse',
          component: MockDataUse
        },
        {
          path: '/minxinsTest',
          component: () => import('@/components/study/mixins/minxinsTest.vue'),
          name: 'minxinsTest',
          meta: {},
        },
      ]
    }
  ]
})
