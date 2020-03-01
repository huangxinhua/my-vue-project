import Mock from 'mockjs'
//假数据mockjs的写法

Mock.mock("/api/myget", 'get', {
  "ListInfo|5": [{
    "id|+1": 1,
    "img": Mock.Random.ctitle(),
    'number4|123.10': 1.123,
    'number': /\d{5,10}/, //数字
    "chard": /[a-z][A-Z][0-9]/, //大小写字母加数字
    'regexp2': /\w\W\s\S\d\D/,
    'cname': Mock.Random.cname(),
    'date': Mock.Random.date(),
    name: {
      first: '@FIRST', //用 @ 来标识其后的字符串是 占位符
      middle: '@FIRST',
      last: '@LAST',
      full: '@first @middle @last'
    },
    "zhanweifu": '@FIRST'
  }]
});
Mock.mock("/api/register", 'post', {
  "name": "huangxinha",
  "password": "123456",
  "age": /\d{5,10}/,
  "birthday": Mock.Random.date()
});
/* 
Mock.mock("/admin/login", 'post', {
  "status": "1"
}) */
