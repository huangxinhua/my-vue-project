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
          <div class="data_list"><span class="data_num">{{userCount}}</span>注册用户$t("name")</div>
        </el-col>
        <el-col :span="4">
          <div class="data_list"><span class="data_num">{{userCount}}</span>订单</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import headTop from '../HeadTop.vue'
export default {
  components: {
    headTop
  },
  data () {
    return {
      userCount: 10,
      orderCount: 20
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
<i18n>
{
  en:{
name:"dd"
  }
  zh:{
name:"zh"
  }
}
</i18n>
