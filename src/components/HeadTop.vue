<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img :src="baseImgPath" class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div><span @click="changeLaguages()">切换语言</span>
      <span>{{ $t('lang.test')}}</span></div>
  </div>
</template>
<script>
import { signout } from '@/api/getData'
import { baseImgPath } from '@/config/env'
export default {
  data () {
    return {
      baseImgPath,
      lang: 'zh-CN'
    }
  },
  methods: {
    async  handleCommand (command) {
      console.log('cmd', command)
      if (command === 'home') {
        this.$router.push('/manager')
      } else if (command === 'signout') {
        const res = await signout()
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$router.push('/')
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }
    },
    changeLaguages () {
      console.log(this.$i18n.locale)
      this.$confirm('确定切换语言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.lang === 'zh-CN') {
          this.lang = 'en-US'
          this.$i18n.locale = this.lang// 关键语句
        } else {
          this.lang = 'zh-CN'
          this.$i18n.locale = this.lang// 关键语句
        }
      }).catch(() => {
        this.$message({
          type: 'info'
        })
      })
    }
  }
}
</script>
<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.el-dropdown-menu__item {
  text-align: center;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
</style>
