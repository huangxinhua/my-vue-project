var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// 设置模拟调试器实例
var mock = new MockAdapter(axios);

// 模拟接收'/users'下的Get请求
// reply方法的参数格式（status,data,headers)
mock.onGet('/users').reply(200, {
  users: [{
    id: 1,
    name: 'John Smith'
  }]
});
