<template>
  <div class="hello">
    <h1 @click="getmockdata">{{ msg }}</h1>
    <h2 @click="postRegisterForm">postregmock</h2>
    <h3 @click="axiosMock">axiosmock data use</h3>
  </div>
</template>

<script>
import { mixinsTest, mixinsTest2 } from '@/components/study/mixins/test.js'
import mock from '../mock/mock';
import axiosMock from "../mock/axios-mock-adapter";
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    console.log('1212')
  },
  methods: {
    getmockdata: function () {
      axios.get("/api/myget").then(function (response) {
        // handle success
        console.log(response.data);
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
        .then(function () {
          // always executed
        });
    },
    postRegisterForm: () => {
      axios.post("/api/register", { "huawei": "in company" }).then(
        (response) => {
          console.log(response.data);
        }
      )
    },
    axiosMock: () => {
      //前端请求
      axios.get('/users')
        .then(function (response) {
          console.log(response.data);
        });
    }
  },
  mixins: [mixinsTest2, mixinsTest] // 先调用那个mixins对象，就先执行哪个
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
