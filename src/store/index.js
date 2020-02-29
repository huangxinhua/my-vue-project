import Vue from 'vue'
import Vuex from 'vuex'
import {
  getAdminInfo
} from '@/api/getData'
Vue.use(Vuex) // install

/* 1.state在vuex中用于存储数据 */
const state = {
  adminInfo: {
    // 默认头像
    avatar: 'default.jpg'
  }
}

/* 2.mutations里面放的是方法，方法主要用于改变state里面的数据
 */
const mutations = {
  saveAdminInfo(state, adminInfo) {
    state.adminInfo = adminInfo
  }
}
/*
4、 基本没有用

Action 类似于 mutation，不同在于：

Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
*/
const actions = {
  getAdminInfoData(context, adminInfo) {
    /*  debugger
     adminInfo.avatar = '11.jpg'
     context.commit('saveAdminInfo', adminInfo) */
    // const res = getAdminInfo()
    // console.log('actions', res)
    // if (res.status === 1) {
    //   context.commit('saveAdminInfo', res.data)
    // } else {
    //   throw new Error(res.type)
    // }
  }
}
// vuex  实例化 Vuex.store
export default new Vuex.Store({
  state,
  mutations,
  actions
})
