<template>
  <nest1 :nest1C="msg"
         :nest11C="title"></nest1>
</template>
<script>
import nest1 from "./nest1";
export default {
  components: {
    nest1
  }, data () {
    return {
      msg: '我是一个home组件',
      title: '首页111'
    }
  }

}
</script>