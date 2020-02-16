<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>Backend Login System</p>
        </div>
        <el-form :model="loginForm" :rules="rules1" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">Login</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>
<script>
import { login } from '@/api/getData'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules1: {
        username: [
          { required: true, message: '请输入username', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please fill password', trigger: 'blur' }
        ]
      },
      showLogin: false
    }
  },
  mounted () {
    this.showLogin = true
  },
  computed: {

  },
  methods: {
    async submitForm (formName) {
      // 校验 $refs组件的实例
      this.$refs[formName].validate(
        async (valid) => {
          if (valid) {
            console.log(' valid:', valid)
            const result = await login({ user_name: this.loginForm.username, password: this.loginForm.password })
            console.log(' result:', result)
            if (result.status === 1) {
              this.$message({
                type: 'success',
                message: 'login successful'
              })
              // 转向管理页面
              this.$router.push('manager')
            } else {
              this.$message({
                type: 'error',
                message: result.message
              })
            }
          } else {
            console.log(' pwd:', valid)
            // 通知
            this.$notify.error({
              title: 'error',
              message: '请输入正确的用户名密码',
              offset: 100
            })
            return false
          }
        }
      )
    }
  }
}
</script>
<style  lang="less" scoped>
@import "../../style/mixin";
.login_page {
  background-color: #324057;
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: rgb(10, 10, 10);
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: rgb(107, 1, 1);
  }
}
.tip {
  font-size: 12px;
  color: red;
}
</style>
