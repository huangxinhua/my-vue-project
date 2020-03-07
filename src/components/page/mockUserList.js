import mock from '../../mock'

let userlist = [{
  id: 1,
  name: "张小张",
  sex: "男",
  age: 31,
  workType: "前端工程师",
  skill: "js,vue,react",
  city: "北京",
  gradeSchool: "河北师范大学"
}, {
  id: 2,
  name: "陶紫建",
  sex: "男",
  age: 36,
  workType: "前端工程师",
  skill: "js,vue,react,aui",
  city: "大连",
  gradeSchool: "东北大学东软信息学院"
}, {
  id: 3,
  name: "王一烈",
  sex: "男",
  age: 30,
  workType: "前端工程师",
  skill: "js,vue,react,aui",
  city: "大连",
  gradeSchool: "沈阳大学"
}, {
  id: 4,
  name: "何洋洋",
  sex: "女",
  age: 25,
  workType: "后端工程师",
  skill: "java",
  city: "山西",
  gradeSchool: "太原理工大学"
}, {
  id: 5,
  name: "聊双镔",
  sex: "男",
  age: 38,
  workType: "全栈工程师",
  skill: "javajs,vue,react,aui",
  city: "深圳",
  gradeSchool: "深圳大学"
}]
mock.onGet('/user/getList').reply(200,
  userlist
);
