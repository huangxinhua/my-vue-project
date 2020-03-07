// var axios = require('axios');
// var MockAdapter = require('axios-mock-adapter');

// // 设置模拟调试器实例
// var mock = new MockAdapter(axios);
import mock from './index.js'
// 模拟接收'/users'下的Get请求
// reply方法的参数格式（status,data,headers)
mock.onGet('/users').reply(200, {
  users: [{
    id: 1,
    name: 'John Smith'
  }]
});

mock.onPost('/admin/login').reply(function (config) {
  // console.log("aaa")
  // return axios.get('/bar');
  return {
    "status": "1"
  }
});

mock.onGet('/banner/getList').reply(200,
  [{
    id: 1,
    name: "个人设置",
    sort: "1",
    icon_class: "icon_copy",
    checked: "false",
    link: "www.baidu.com",
    isEditable: "",
    popoverEditVisiable: false
  }, {
    id: 2,
    name: "切换租户",
    sort: "2",
    icon_class: "icon_copy",
    checked: "false",
    link: "www.baidu.com",
    isEditable: "",
    popoverEditVisiable: false
  }, {
    id: 3,
    name: "语言切换",
    sort: "3",
    icon_class: "icon_copy",
    checked: "false",
    link: "",
    isEditable: "",
    popoverEditVisiable: false
  }]
);
