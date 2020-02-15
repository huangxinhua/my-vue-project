import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Button from '@/components/elem/Button.vue'
import Login from '@/components/page/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/Button',
      name: 'Button',
      component: Button
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
