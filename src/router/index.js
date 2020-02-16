import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Button from '@/components/elem/Button.vue'
import Login from '@/components/page/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloword',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/Button',
      name: 'Button',
      component: Button
    }, {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      // 懒加载方式
      path: '/manager',
      name: 'manager',
      component: () => import('@/components/page/Manager.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/page/Home.vue'),
          meta: []
        }, {
          path: '/userlist',
          component: () => import('../components/page/UserList.vue'),
          meta: ['用户数据', 'user data']
        }
      ]
    }
  ]
})
