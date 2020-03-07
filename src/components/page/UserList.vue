<template>
  <div>
    <div>
      <head-top></head-top>
    </div>
    <div>
      <el-table :data="userList">
        <el-table-column label="id" prop="id" width="80px" />
        <el-table-column label="姓名" prop="name" width="80px" />
        <el-table-column label="性别" prop="sex" width="50px" />
        <el-table-column label="年龄" prop="age" width="50px" />
        <el-table-column label="职别" prop="workType" />
        <el-table-column label="擅长" prop="skill" />
        <el-table-column label="城市" prop="city" width="50px" />
        <el-table-column label="毕业院校" prop="gradeSchool" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                class="operation_button"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                class="operation_button"
                size="mini"
                type="Success"
                @click="add(scope.$index, scope.row)"
              >添加</el-button>
              <el-button
                class="operation_button"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="userList.size"
          :page-size="2"
          :page-count="2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '../HeadTop';
import axios from "axios";
import './mockUserList'

export default {
  data () {
    return {
      userList: []
    }
  },
  components: {
    headTop
  },
  beforeCreate () {
  },
  created () {
    this.initUserList()

  },
  methods: {
    initUserList () {
      axios.get('/user/getList').then((response) => {
        if (response) {
          this.userList = response.data;
        }
      })
    },
    handleEdit: (index, row) => {
      console.log(index, 'row', row)
    },
    add: (index, row) => {
      console.log('add')
    },
    async handleDelete (index, row) {
      this.userList.splice(Number.parseInt(index), 1)
      //TODO 发送请求
    },
  }
}
</script>
<style lang="less">
.operation_button {
  padding: 4px 8px;
  margin-left: 4px;
}
</style>
