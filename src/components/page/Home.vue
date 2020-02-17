<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="data_list today_head"><span class="data_num head">当日数据：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{userCount}}</span>新增用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{orderCount}}</span>新增订单</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{allUserCount}}</span>注册用户</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{allOrderCount}}</span>订单</div>
        </el-col>
      </el-row>
    </section>
    <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
  </div>
</template>
<script>
import headTop from '../HeadTop.vue'
import tendency from '@/components/Tendency.vue'
import dtime from 'time-formater'
export default {
  components: {
    headTop,
    tendency
  },
  data () {
    return {
      userCount: 10,
      orderCount: 20,
      adminCount: 30,
      allUserCount: 40,
      allOrderCount: 60,
      allAdminCount: 70,
      sevenDay: [],
      sevenDate: [[], [], []]
    }
  },
  computed: {

  },
  mounted () {
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD')
      this.sevenDay.push(date)
      this.getSevenData()
    }
    this.sevenDate = [11, 22, 33]
  },
  methods: {
    async getSevenData () {
      const apiArr = [[], [], []]
      this.sevenDay.forEach(item => {
        apiArr[0].push(1000)
        apiArr[1].push(200)
        apiArr[2].push(123123)
      })
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[], [], []]
        res.forEach((item, index) => {
          if (item.status === 1) {
            resArr[Math.floor(index / 7)].push(item.count)
          }
        })
        this.sevenDate = resArr
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less">
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    font-size: 20px;
    text-align: center;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
</style>
