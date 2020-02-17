<template>
  <div class="line1">
    <div id="line1" class="" style="width: 90%;height:450px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: ['sevenDate', 'sevenDay'],
  mounted () {
    this.mychart = echarts.init(document.getElementById('line1'))
    this.initData()
  },
  methods: {
    initData () {
      const colors = ['#5793f3', '#675bba', '#d14a61']
      const data = {
        color: colors,
        title: {
          text: '走势图',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['bar', 'line'] },
            restore: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: [{
          type: 'value',
          name: '用户',
          min: 0,
          max: 200,
          position: 'left',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '订单',
          min: 0,
          max: 200,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        }]
      }
      this.mychart.setOption(data)
    }
  },
  watch: {
    sevenDate: function () {
      this.initData()
    },
    sevenDay: function () {
      this.initData()
    }
  }
}
</script>
<style lang="less">
.line1 {
  display: flex;
  justify-content: center;
}
</style>
