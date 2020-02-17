
// 暴露两个mixins对象
export const mixinsTest = {
  methods: {
    hello () {
      console.log('hello mixins1')
    }
  },
  created () {
    this.hello()
  }
}

export const mixinsTest2 = {
  data () {
    return {
      testProps: 'test'
    }
  },
  methods: {
    hello2 () {
      console.log('hello2')
    }
  },
  created () {
    this.hello2()
  }
}
