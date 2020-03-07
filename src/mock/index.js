var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

// 设置模拟调试器实例

export default new MockAdapter(axios);
