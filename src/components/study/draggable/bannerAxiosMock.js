// var axios = require('axios');
// var MockAdapter = require('axios-mock-adapter');

// // 设置模拟调试器实例
// var mock = new MockAdapter(axios);
import mock from '../../../mock'
var bannerList = [{
  id: 1,
  name: "个人设置",
  sort: "1",
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAhCAYAAABTERJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMoSURBVFhH7Za7SytBFMbTxsKI+EQjalA7sVG0tjGNIFiIjViIhPRaRhRUEBVF0XSiiJ1gkSqF/gHah4T4qBKJr6gI2nyX7zjL7tWdVcYr18IfDJn5zszZk905Z8aHH8RvMDp+g9FhHEw+n0dXVxcaGxv/atRoM8E4mPX1dXnw3t4e9vf3kUgkkEwm0d7eLjYTjIOJRqMYHR1VI5uBgQGxmfCpYLa2trCxsYHHx0elAOFwGHNzc2pkE4vFxGbx8vKCg4MD7OzsKEXPh8HwM1RUVKCsrEx+p6en0dHRgfLychwfH6tZNtRo45yZmRnU1dWhsrISJSUl4ssLz2CKxSIaGhowOzuLQqGAlZUVdHZ2Ynx8HLlcTs16D22cwz21ubmJ29tbTE5Oii/61OEZDF85Hdzf3yvFnJubG/FFnzq0wZyfn6O0tFT2i47Ly0ssLy9jeHhYGvvUdOzu7opP+nZDG8zCwoLUDd1rPTo6kr3Q2tqKSCQijX1qtLlxfX2N2tpa8e2GNpiLiwsEg0HZiOl0Wqmv8JU3Nzejv78fT09PSoX0qdHGOU7og8HSJ3274blnWEl7e3slkzKZjFKBpaUlVFVV4e7uTik21GjjHAuupQ/68qrOnsFY+Hw+HB4eqhEwNDQke0QHbZxjwbX08RFGwfBhIyMjavQe2pzB/pNgrM8UCASQzWaVCsma6upq11pDjTbOsTg9PZVCaPyZ+HButlAohFQqpdRXmL7MGp5Dz8/PSoX0qdH2NsW5abu7u8Wn84850QazuLiImpoaSUc3mL7Mmra2Nqm2bOxT06U2i2dTU5P4dkMbjFX0vA44pi+zhpuVjf23Ke1ke3vbrOgRlu76+npcXV0pxZyHhwcpokbHAbEOyomJCXHGo4GH32cPyp6eHsTjcak98/PzXzsoCY99v98vhYzXgLGxMfmHzI6TkxM1y4YabZzDuVzDMa8fX7pCWPCNrK2tyVXAoq+vD1NTU2pkQ815ueIaruUb+ohPBeMGD8bBwUE1sqH2rddON1ZXV+XyzerqbP/lQn52diYbkmXe2VpaWsRmgnEw38FvMDp+UDDAH3vuXwHOd1KoAAAAAElFTkSuQmCC",
  icon_class: "icon-nav-user",
  link: "www.baidu.com",
  editable: 1,
  service: "",
  category: "url"
}, {
  id: 2,
  name: "切换租户",
  sort: "2",
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANpSURBVFhH7ZZbKHRRFMcniRS5hBGRB7mkJC8mCSVKSBLlxa3IbaRIuSSSvCA8IYl4kDxIorxRQpIklySUlJBLciv6ay171Ddz9pwz86DvYX41tc/eu3N+s9ba6xwd/hMcIuY4RMyxS+T6+hqDg4MoKipCXl4eurq6cHR0JFbtQ5PI9PQ0Njc3eby4uAhfX19ERUWhvLwc9fX1SE5OhouLC1paWniPPaiKfH19ITw8HIWFhbi8vOQHdnZ24vPzU+z4YWJiAjqdDjMzM2LGNlRFVlZW4O7ujouLC2RmZqKgoECsWNLa2orAwEC8vb2JGe2oihQXF3M0CB8fH06NjNPTU47Kzs6OmNGOqkhKSgo6Ojpwd3fHDzk4OBArynh7e2Nubk5caUdVJCsrC5WVlTymIl1eXuaxEmdnZyy7t7cnZrSjKtLd3Y2IiAh8fHwgIyMDSUlJYsUSOkX+/v54f38XM9pRFbm9vYVer8fs7CyOj4/h7OyM2tpaPD09iR0/J6u/v5+jMTo6KmZtQ1Xk5uYG0dHRHBliYWEBoaGh8PPzQ35+PioqKhAZGQk3N7ffPfZgVYRyTg8hESpWYn19HU1NTfDw8OAI0M/V1RW5ubkYHh7Gw8MD77MVqQhJUE+gU/Py8sICBoOBHxwWFsbHuqGhgbtpSUkJ0tPTWc7T0xN9fX14fX1FXV0dmpubcX9/L+4qR1GEGlJsbCxiYmL4hgMDA9xRs7Ozsb29LXZZ8vz8jMbGRpaNi4tDWVkZRy8+Ph45OTnY2toSOy1RFKF/5OXlhfPzc8zPz/ONe3t7xap1EhMT0d7ezhE0ddiNjQ2MjY0hODiYr5VQFKHeQS+zx8dHhISEoKqqSqxYh04PRZEkiMnJyd9TRLVDzY6ipoTVYjW9O+gIa6G6uhpGo5HHIyMjnJaenh5OF0GfC9SLlJCK0L8LCgrC0NCQmFEnISEBU1NTPK6pqcHq6iq/LCnCxO7uLkdMCanI2toanJyccHV1JWbUoYZHze/w8JDrKy0tDampqXxNqaGua0qbOVKRtrY2rnZboQ8mKk5zqDFSjciQilCuqUnZyvj4OAICAjgyS0tL/GlA19SJqeZkSEVKS0u5adkDpeHk5IRfBZQO+riSnRYTUpH9/X3O+V8hFflrHCLmOETMcYj8C/AN7PqmUyxuTUcAAAAASUVORK5CYII=",
  icon_class: "icon-nav-folder-user",
  link: "www.baidu.com",
  editable: 1,
  service: "/tenant/gettenantList",
  category: "service"
}, {
  id: 3,
  name: "语言切换",
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIlSURBVFhH7ZbLywFRFMC/fxF5bz0SK0nKgo2Fx8oOeUUoKWUhiURRbLG0Z8OGFDpf57jymvlGo+uzmF+dmnNn5vrNuTPX+YEvQxGSQhGSQhGS4iWhUCgEKpXq7bBarZBMJtmswrwkNJ/Podvtvh25XI7EUqkUm/mZjy9ZqVQCs9nMsmdEhZbLJcRiMXA4HGC322WH0+mESCQCq9WK5sVKYZXEEBUKh8NgNBohm81CpVKRHZlMBmw2G0SjUZpXtpDJZIJ6vc6y98B3Bh8OkS2EN+HNf7Hf76FarcLhcGAjwmClLhJchdLpNF1XKBTYiDAfEdput2AwGECj0YBarYbj8cjOPPMRoWKxSCLD4RB0Oh10Oh125hnuQqfTiWT8fj/lXq8XXC4XHQvBXajX69FSjcdjygeDAVVpNBpR/gh3IY/HQxveLRaLBXw+H8vu4So0mUxAr9dDMBikT/4SgUCAqrRYLNiVV7gK4Q6O7w8u2WPgeDweZ1de4SaE/0darZZ+QIhyuUxim82GjZzhJoTtAy7XbrdjI/es12uqUj6fZyNnuAm1221oNpssEyaRSEC/32fZGa7vkBy4Cc1mM5pcKlqtFrvjDI5xEarVaoJN2GNgD37LrdB0OgW3203HQogKYT/UaDRY9h7Y5OHH8AqiQrjfYKeHUlgpuYFN3m3HKIWoEO45OAk+GZZbbmCl8eGwR38FUaH/QhGSQhGSQhGS4suEAH4BmCsniYkdSDcAAAAASUVORK5CYII=",
  sort: "3",
  icon_class: "icon-nav-global",
  link: "",
  editable: 0,
  service: "/lang/getList",
  category: "service"
}];
// 模拟接收'/users'下的Get请求
// reply方法的参数格式（status,data,headers)
mock.onGet('/users').reply(200, {
  users: [{
    id: 1,
    name: 'John Smith'
  }]
});

mock.onPost('/admin/login').reply(function (config) {
  console.log("aaa")
  // return axios.get('/bar');
  return {
    "status": "1"
  }
});



mock.onGet('/banner/getList').reply(200,
  bannerList
);
mock.onPost('/user').reply(200, function (config) {
  return {
    "status": "1"
  }
});
// mock.onPost('/banner/createOrupdate', {
//   "status": "1",
//   "msg": "create success"
// }).reply(200);

mock.onPost('/banner/createOrupdate').reply(200, {
  "status": "0",
  "message": "名称重复"
});
mock.onPost('/banner/delete').reply(200, function (config) {
  return {
    "status": "1"

  }
});

mock.onPost('/lang/getLang').reply(200, function (config) {
  return {
    "status": "1"
  }
});


mock.onGet('/lang/getList').reply(200,
  [{
    "title": "简体中文",
    "link": "www.huawei.com",
    "img": "/app/style/simple/images/header/icon-language-china.svg"
  }, {
    "title": "english",
    "img": "/app/style/simple/images/header/icon-language-english.svg"
  }]
);
mock.onGet('/tenant/gettenantList').reply(200,
  [{
    "title": "auotest1",
    "link": "www.huawei.com",
    "img": "/app/style/simple/images/header/icon-language-china.svg"
  }, {
    "title": "autotest2",
    "link": "www.huawei.com",
    "img": "/app/style/simple/images/header/icon-language-english.svg"
  }]
);
