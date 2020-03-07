<template>
  <div>
    <el-form
      :model="editForm"
      layoutType="horizontal"
      ref="form"
      class="popForm"
      :disabled="!editForm.editable"
    >
      <el-form-item type="flex" align="left">
        <el-col :span="5" style="line-height: 28px;">
          <span>菜单图标</span>
        </el-col>
        <el-col :span="19" style="display: flex;">
          <img :src="editForm.icon" width="30px" height="30px" />
          <span v-if="editForm.editable" @click="changeIconFnc" style="color: #6C92FA;">更改</span>
        </el-col>
      </el-form-item>
      <el-form-item type="flex" align="left">
        <el-col :span="5">菜单名称</el-col>
        <el-col :span="19">
          <el-input v-model="editForm.name" :disabled="!editForm.editable"></el-input>
          <!-- <text-input
                            ref="input"
                            v-model="editForm.name"
                            name="name"
                            :readOnly="editForm.isReadonly"
                            tooltip="input1-tooltip"
                            :required="true"
                            placeholder="input"
                            :avoidSpecialChars="true"
                            :whenHiddenSkipCheck="true"
          ></text-input>-->
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">链接方式</el-col>
        <el-col :span="19">
          <el-radio :disabled="editForm.isReadonly" v-model="editForm.category" label="url">跳转链接</el-radio>
          <el-radio :disabled="editForm.isReadonly" v-model="editForm.category" label="service">服务</el-radio>
        </el-col>
      </el-form-item>
      <el-form-item type="flex" align="left" v-if="editForm.category=='url'">
        <el-col :span="5">
          <span>跳转链接</span>
        </el-col>
        <el-col :span="19">
          <el-input v-model="editForm.link"></el-input>
          <!-- <text-input
                            ref="input"
                            type="textarea"
                            v-model="editForm.link"
                            :readOnly="editForm.isReadonly"
                            :required="false"
                            placeholder="please input link"
          ></text-input>-->
        </el-col>
      </el-form-item>
      <el-form-item type="flex" align="left" v-if="editForm.category=='service'">
        <el-col :span="5">
          <span>服务</span>
        </el-col>
        <el-col :span="19">
          <el-input
            ref="input"
            type="textarea"
            v-model="editForm.service"
            :readOnly="editForm.isReadonly"
            :required="false"
            placeholder="please input link"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item type="flex" align="right">
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <div>
            <el-button
              class="disable_button"
              type="primary"
              plain
              :disabled="editForm.isReadonly"
              @click="onSubmit(editForm)"
            >确认</el-button>
            <el-button type="primary" plain @click="editForm.popoverEditVisiable=false">关闭</el-button>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="pop_wapper" v-if="isShowPop">
      <change-icon @closePop="closePop" @selectedLogo="($event)=>{selectedLogo($event,editForm)}" />
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui'
// import './bannerAxiosMock';
import changeIcon from './changeLogo'
export default {
  name: 'ToolbarEdit',
  props: {
    editForm: Object
  },
  data () {
    return {
      isShowPop: false
    }
  },
  components: {
    Message, Message, Notification,
    changeIcon
  },
  methods: {
    closeForm (data) {
      data.popoverEditVisiable = false;
    },
    closePop (value) {
      this.isShowPop = value;
    },
    selectedLogo (value, itemData) {
      debugger
      itemData.icon = value;
      this.closePop(false)
    },
    onSubmit (data) {
      debugger
      // this.bannerData.forEach(element => {
      //   if (element.name === data.name && data.id != element.id) {
      //     Nf.promptError({
      //       message: "有相同的菜单名称，请重新输入",
      //       handler: function () { },
      //       height: 180,
      //       width: 350
      //     });
      //   }
      // });
      var submitData = {};
      if (data.id) {//update
        submitData.id = data.id;
      }
      submitData.name = data.name;
      submitData.sort = data.sort;
      submitData.link = data.link;
      submitData.isReadonly = data.isReadonly;
      axios({
        method: 'post',
        url: '/banner/createOrupdate',
        data: submitData
      }).then(function (response) {
        // handle success
        console.log(response.data);
        if (response.data && response.data.status == "1") {
          MessageBox({
            type: 'success',
            message: 'login successful'
          })
        } else {
          MessageBox({
            type: 'error',
            message: response.data.message
          })
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
      data.popoverEditVisiable = false;
    },
    // closeForm (data) {
    //   data.popoverEditVisiable = false;
    // },
    // closePop (value) {
    //   this.isShowPop = value;
    // },
    // selectedLogo (value, itemData) {
    //   debugger
    //   itemData.icon = value;
    //   this.closePop(false)
    // },
    changeIconFnc () {
      /* Nf.promptWindow({
        message: "/change-icon/index.html",
        zIndex: 6000,
        appendToBody: true,
        title: "工程配置",
        height: 481,
        callback:function(){ console.log("window")},
        width: 477
      });*/
      // setTimeout(function () {
      //   let mask = document.getElementsByClassName("prompt-wrapper");
      //   if (mask) {
      //     mask[0].addEventListener("click", function (e) {
      //       e.stopPropagation();
      //     });
      //   }
      // }, 1000);
      this.isShowPop = true
    }
  }
}
</script>