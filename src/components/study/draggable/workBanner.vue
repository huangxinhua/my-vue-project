<template>
  <div id="customMenu" @click="clickCustomMenu">
    <div>
      <banner-toolbar ref="bannerToolbar"></banner-toolbar>
    </div>
    <div class="customMenu">
      <div class="custom-menu-content">
        <LayoutPanel class="layout-panel" title="设置">
          <div>
            <a-button
              :text="$t('banner.create')"
              iconClass="el-icon-add-location"
              @click="addBanner"
            ></a-button>
            <a-button :text="$t('banner.delete')" iconClass="icon_delete" @click="deleteBanner"></a-button>
          </div>
          <div class="tree-one-box" ref="dragTreeBox" v-show="bannerData.length > 0">
            <div class="tree-one" ref="dragTree">
              <Tree
                :data="bannerData"
                ref="targetTree"
                :space="6"
                openedClass="tree-child"
                :draggable="true"
                :options="{handle:'icon_edit',animation:100}"
                @drag="onDrag"
                @drop="onDrop"
                @change="onTreeChange"
              >
                <div slot-scope="{data}" @click="editBanner(data)">
                  <el-popover
                    trigger="click"
                    placement="right"
                    ref="popover"
                    popper-class="banner-add-tool-pop"
                    v-model="data.popoverEditVisiable"
                  >
                    <form-panel layoutType="horizontal" ref="form" class="popForm">
                      <a-row type="flex" align="left">
                        <a-col :span="5" style="line-height: 28px;">
                          <span>菜单图标</span>
                        </a-col>
                        <a-col :span="19">
                          <img :src="data.icon" width="30px" height="30px" />
                          <span @click="changeIcon" style="color: #6C92FA;">更改</span>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="left">
                        <a-col :span="5">菜单名称</a-col>
                        <a-col :span="19">
                          <text-input
                            ref="input"
                            v-model="data.name"
                            name="name"
                            :readOnly="data.isReadonly"
                            tooltip="input1-tooltip"
                            :required="true"
                            placeholder="input"
                            :avoidSpecialChars="true"
                            :whenHiddenSkipCheck="true"
                          ></text-input>
                        </a-col>
                      </a-row>
                      <a-row>
                        <a-col :span="5">链接方式</a-col>
                        <a-col :span="19">
                          <el-radio
                            :disabled="data.isReadonly"
                            v-model="data.category"
                            label="url"
                          >跳转链接</el-radio>
                          <el-radio
                            :disabled="data.isReadonly"
                            v-model="data.category"
                            label="service"
                          >服务</el-radio>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="left" v-if="data.category=='url'">
                        <a-col :span="5">
                          <span>跳转链接</span>
                        </a-col>
                        <a-col :span="19">
                          <text-input
                            ref="input"
                            type="textarea"
                            v-model="data.link"
                            :readOnly="data.isReadonly"
                            :required="false"
                            placeholder="please input link"
                          ></text-input>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="left" v-if="data.category=='service'">
                        <a-col :span="5">
                          <span>服务</span>
                        </a-col>
                        <a-col :span="19">
                          <text-input
                            ref="input"
                            type="textarea"
                            v-model="data.service"
                            :readOnly="data.isReadonly"
                            :required="false"
                            placeholder="please input link"
                          ></text-input>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="right">
                        <a-col :span="12"></a-col>
                        <a-col :span="12">
                          <div>
                            <el-button
                              class="disable_button"
                              type="primary"
                              plain
                              :disabled="data.isReadonly"
                              @click="onSubmit(data)"
                            >确认</el-button>
                            <el-button
                              type="primary"
                              plain
                              @click="data.popoverEditVisiable=false"
                            >关闭</el-button>
                          </div>
                        </a-col>
                      </a-row>
                    </form-panel>
                    <div class="pop_wapper" v-if="isShowPop">
                      <change-icon
                        @closePop="closePop"
                        @selectedLogo="($event)=>{selectedLogo($event,data)}"
                      ></change-icon>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <div
                        :class="['tree-content', {'tree-drop-not': !data.isDragPlaceHolder && dragging && !data.droppable}]"
                      >
                        <el-checkbox v-model="data.checked"></el-checkbox>
                        <span :class="data.icon_class" style="margin-left:18px">
                          <img :src="data.icon" class="bannerImage" />
                        </span>
                        <span :class="['label-content', 'label-padding']">{{getDisplayName(data)}}</span>
                        <span class="icon_ide_edit"></span>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </Tree>
            </div>
          </div>
          <div class="exit">
            <el-checkbox></el-checkbox>
            <span style="margin-left:18px;">
              <img
                style="width:24px;height:24px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH4SURBVFhH7ZZPSwJBGIf7gBIEQuDRkyCIJ8F7X8FTx0DyGEgehMKDhF4MwYsihF4EAxEhEIS3HmaG0WVmZ7SCCB8Ymn3//Obnxr67F/JHOBtJcjaS5GwkyT8xMpmo9QPEG1mtRFotkfVaXfP38lKt/Rg11B5JnJFuV+T6WiSTEanVVGyxUNcs9kCOa2rpOYKwkYcHe2A2K9LrqbjLCDlqTJzeSNKNvLxY0VLJHgguI8CeWpPr93UiHb+RzUYkl1NixaLIx4dOaHxGgFpjBg20AviN3N0poasrkflcB/dIMwL00EserQB+I+Zu3N7qQILl0hph74Je8mgFcBsZj+0h7H08P6vlYzq1OuxTcBt5fFTNPAHfxTxF7bYOuHEbub9Xzfm8DnwDNNCq13XAjdsITT9tpNHQATduI09Pqpnxvd3q4AnQa56cTkcH3biNzGaqmTUY6OAJ0Gt00EzBbQQKBSVwc6MDJ0AvGgzEAH4jvEXNr4kc0we8vtr+ZlMH/fiN7HaHY9o1XX1QawYiGmgF8BuBtzc7BxCOebVz98wnA71oRJBuBEajw1d7taqm6fu7LviCDyFi5EwdPfRGEjYC/Kpy2R4SWtRG3glDnBHg/8x8qVTch7PIBeaFj3gj+/B9wYzg/cEaDqO+OdI4zcgvcDaS5I8YEfkEDlNBoGE+7ZgAAAAASUVORK5CYII="
              />
            </span>
            <span style="margin-left: 15px;font-size:17px">退出登录</span>
          </div>
        </LayoutPanel>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { DraggableTree } from "vue-draggable-nested-tree";
import LayoutPanel from "./components/LayoutPanel";
import { Checkbox, Table, TableColumn, Button, Popover, Radio } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import FormPanel from "@adc/adc-ui/lib/form-panel";
import RadioGroup from "@adc/adc-ui/lib/radio-group";
import RadioGroupOption from "@adc/adc-ui/lib/radio-group-option";
import ACol from "@adc/adc-ui/lib/col";
import ARow from "@adc/adc-ui/lib/row";
import TextInput from "@adc/adc-ui/lib/text-input";
import AButton from "@adc/adc-ui/lib/button";
import axios from 'axios';
import FileInput from "@adc/adc-ui/lib/file-input";
import { Nf } from "@adc/adc-ui/lib/utils/adapter";
import bannerToolbar from "../../runtime/header/bannerToolbar";
import changeIcon from './components/changeLogo'
import axiosMock from '../../runtime/header/bannerAxiosMock';
import Vue from "vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Radio);
export default {
  name: "banner",
  components: {
    LayoutPanel,
    Tree: DraggableTree,
    Checkbox,
    FormPanel,
    ACol,
    ARow,
    RadioGroup,
    RadioGroupOption,
    TextInput,
    "a-button": AButton,
    FileInput,
    bannerToolbar,
    changeIcon
  },
  data () {
    return {
      popoverVisible: false,
      isShowRuler: true,
      isShowConfirmDialog: false,
      isShowInfo: false,
      dragging: false,
      maxTreeLevel: 1,
      showNodeEdit: false,
      bannerData: [],
      isShowPop: false
    };
  },
  computed: {},
  mounted () {
    // this.init();
  },
  created () {
    document.title = this.$t("title");
    this.initData();
  },
  methods: {
    async initData () {
      const result = await axios.get('/banner/getList').then(function (response) {
        // handle success
        if (response && response.data) {
          return response.data
        }
      });
      if (result && (result instanceof Array)) {
        result.forEach(item => {
          //editable=1可编辑 0不可编辑
          if (item.editable == 0 || item.editable === "0") {
            item.isReadonly = true;
          } else {
            item.isReadonly = false;
          }
          item.popoverEditVisiable = false;
          item.checked = false;
        })
        this.bannerData = result;
      }
      debugger
    },
    clickCustomMenu: function () {
      this.$refs.bannerToolbar.isMenuShow = false;
    },
    //拖拽操作
    onDrag (node) {
      this.dragging = true;
      // 根据拖拽位置更新动画
      this.checkScrollBarr(node);
      // 控制菜单级数
      let nodeLevels = 1;
      this.depthFirstSearch(node, childNode => {
        if (childNode._vm.level > nodeLevels) {
          nodeLevels = childNode._vm.level;
        }
      });
      nodeLevels = nodeLevels - node._vm.level + 1;
      const childNodeMaxLevel = this.maxTreeLevel - nodeLevels;
      this.depthFirstSearch(this.bannerData, childNode => {
        if (childNode !== node) {
          const droppable =
            !childNode.page &&
            childNode._vm &&
            childNode._vm.level <= childNodeMaxLevel;
          this.$set(childNode, "droppable", droppable);
        }
      });
    },
    depthFirstSearch (obj, handler, childrenKey = "children", reverse) {
      const rootChildren = Array.isArray(obj) ? obj : [obj];
      const StopException = () => { };
      const func = (children, parent) => {
        if (reverse) {
          children = children.slice();
          children.reverse();
        }
        const len = children.length;
        for (let i = 0; i < len; i++) {
          const item = children[i];
          const r = handler(item, i, parent);
          if (r === false) {
            // stop
            throw new StopException();
          } else if (r === "skip children") {
            continue;
          } else if (r === "skip siblings") {
            break;
          }
          if (item[childrenKey] != null) {
            func(item[childrenKey], item);
          }
        }
      };
      try {
        func(rootChildren);
      } catch (e) {
        if (e instanceof StopException) {
          // stop
        } else {
          throw e;
        }
      }
    },
    onDrop () {
      this.dragging = false;
    },
    //拖拽时动画更新滚动条
    checkScrollBarr () {
      const critical = 88;
      const root = this.$refs["dragTree"];
      const rootHeight = root.offsetHeight;
      function check () {
        const ele = document.getElementsByClassName("dragging")[0];
        if (!ele) return;
        const offset = ele.offsetTop;
        const distanceBottom = rootHeight - offset;
        const distanceTop = offset;
        if (distanceBottom < critical) {
          root.scrollTop += 5;
        } else if (distanceTop < critical) {
          root.scrollTop -= 5;
        }
        if (this.dragging) {
          requestAnimationFrame(check.bind(this));
        }
      }
      //浏览器在下次重绘之前调用指定的回调函数更新动画
      requestAnimationFrame(check.bind(this));
    },
    // 将树形结构产生的多余数据删除
    getTreePureData (node) {
      const t = Object.assign({}, node);
      delete t._id;
      delete t.parent;
      delete t.children;
      delete t.active;
      delete t.style;
      delete t.class;
      delete t.innerStyle;
      delete t.innerClass;
      delete t.innerBackStyle;
      delete t.innerBackClass;
      for (const key of Object.keys(t)) {
        if (key[0] === "_") {
          delete t[key];
        }
      }
      if (node.children) {
        t.children = node.children.slice();
        t.children.forEach((v, k) => {
          t.children[k] = this.getTreePureData(v);
        });
      }
      return t;
    },
    editBanner (row) {
      this.popoverVisible = true;
    },
    //拖拽后树形结构发生变化，重新生成新数据
    onTreeChange (node, targetTree) {
      var ary = this.bannerData;
      var resultSort = []
      for (var i = 0; i < ary.length; i++) {
        ary[i].sort = (i + 1).toString();
        resultSort.push({ id: ary[i].id, sort: ary[i].sort })
      }
      //把顺序重新入库
      axios({
        method: 'post',
        url: '/banner/sortUpdate',
        data: resultSort
      });
    },
    // onOriginalNodeOpenChange(node) {
    //     this.$store.commit("setOriginalNodeOpenStatus", {
    //         keyCode: node.keycode,
    //         open: node.open
    //     });
    // },
    getDisplayName (data) {
      return data.name;
    },
    deleteBanner () {
      let ary = this.$refs.targetTree.data
      Nf.promptConfirm({
        message: "确定要删除吗?",
        closeBtn: true,
        handler: btn => {
          if (btn === "ok") {
            //删除选择的元素
            if (ary) {
              let submitDataId = []
              for (var i = 0; i < ary.length; i++) {
                if (ary[i].checked == true) {
                  if (ary[i].id) {
                    submitDataId.push(ary[i]);
                  }
                  ary.splice(i, 1);
                  i--;
                }
              }
              axios({
                method: 'post',
                url: '/banner/delete',
                data: submitDataId
              });
            }
          }
        },
      });
    },
    addBanner () {
      let emptyForm = { "sort": this.bannerData.length + 1, category: "url", checked: false, isReadonly: false, popoverEditVisiable: true }
      this.bannerData.push(emptyForm);
    },
    onSubmit (data) {
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
      });
      data.popoverEditVisiable = false;
    },
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
    changeIcon () {
      /* Nf.promptWindow({
        message: "/change-icon/index.html",
        zIndex: 6000,
        appendToBody: true,
        title: "工程配置",
        height: 481,
        callback:function(){ console.log("window")},
        width: 477
      });*/
      setTimeout(function () {
        let mask = document.getElementsByClassName("prompt-wrapper");
        mask[0].addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }, 1000);
      this.isShowPop = true
    }
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.bannerImage {
  height: 24px;
  width: 24px;
}
#customMenu {
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  * {
    box-sizing: border-box;
  }
  .menueName {
    margin-top: 10px;
  }
  .exit {
    margin: 0px 17px 17px 17px;
    border-top: 1px solid #e6eaf2;
    padding-top: 17px;
  }
  .customMenu {
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #e6eaf2;
    padding: 25px 40px;
  }
  .custom-menu-content {
    display: flex;
    align-items: center;
    margin-top: 10px;
    height: calc(100% - 120px);
    width: 320px;
  }
  .custom-menu-select {
    width: 36px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
    border: 1px solid #2b86ff;
    text-align: center;
    color: #2b86ff;
    font-size: 20px;
    margin: 0 20px;
    cursor: pointer;
  }
  .tree-one-box {
    position: relative;
    height: 100%;
    overflow: hidden;
    user-select: none;
    .node-edit-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .edit-box {
      position: absolute;
      width: 300px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .layout-panel {
    width: 500px;
  }
  .tree-one {
    padding: 10px;
    font-size: 14px;
    line-height: 2;
    color: #242a34;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    box-sizing: border-box;
    .tree-node-children {
      overflow-x: hidden;
    }
    .icon-open {
      font-size: 20px;
      color: #94a0b6;
      margin-left: -5px;
    }
    .label-content {
      display: inline-block;
      font-size: 17px;
      max-width: calc(100% - 60px);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .tree-content {
      @nodeH: 32px;
      padding: 0 8px;
      cursor: pointer;
      line-height: 32px;
      .label-padding {
        padding-left: 15px;
      }
      &.tree-drop-not {
        background: #f5f5f5;
        color: #94a0b6;
        cursor: not-allowed;
      }
      .icon_ide_add {
        display: none;
        font-size: 16px;
        color: #96a2bb;
        cursor: pointer;
        float: right;
        line-height: @nodeH;
        margin-right: 6px;
      }
      .icon_close {
        font-size: 20px;
        color: #96a2bb;
        cursor: pointer;
        float: right;
        line-height: @nodeH;
      }
      .icon_ide_edit {
        font-size: 16px;
        color: #96a2bb;
        cursor: pointer;
        float: right;
        line-height: @nodeH;
      }
      &:hover {
        .icon_ide_add {
          display: block;
        }
        .tree-active;
      }
    }
    .tree-active {
      background: #eff6ff;
      // color: #db061f;
      font-weight: 500;
      // span {
      //     color: #db061f;
      // }
    }
    .tree-hover {
      cursor: pointer;
      &:hover {
        .tree-active;
      }
    }
    .tree-lock {
      background: #f5f5f5;
      color: #94a0b6;
      padding-left: 5px;
      cursor: not-allowed;
      span {
        color: #94a0b6;
      }
      .span-edit {
        color: #2c86ff;
      }
    }
    span {
      vertical-align: middle;
    }
    .tree-padding {
      padding-left: 15px;
      line-height: 32px;
    }
    .tree-child {
      > .tree-node-children {
        padding-left: 16px;
      }
    }
  }
  .no-select-view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #94a0b6;
  }
  .custom-menu-foot {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .btn {
      border-radius: 2px;
      padding: 6px 20px;
      text-align: center;
      font-size: 14px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .btn-primary {
      background: #2c86ff;
      color: #ffffff;
    }
    .btn-default {
      background: #fff;
      color: #2c86ff;
      border: 1px solid #2c86ff;
      margin-left: 20px;
    }
  }
  .draggable-placeholder {
    margin: 8px 0;
  }
  .disable_button {
    border: 1px solid;
    background: #fff;
  }
  .draggable-placeholder-inner {
    border-bottom: 1px solid #db061f;
    box-sizing: border-box;
    background: rgba(0, 136, 249, 0.09);
    padding: 8px;
    margin: 6px;
    .tree-content {
      display: none;
    }
  }
}
.pop_wapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 6000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popForm {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
}
</style>
<style >
.banner-add-tool-pop {
  z-index: 200 !important;
}
</style>
<i18n>
  {
    "en": {
      "title": "banner",
      "banner": {
        "create":"Create",
        "delete":"Delete",
        "noCustomMenu": "The 'Customized Menu' must be added to the new menu list, otherwise the menu will not be edited later!",
		"CustomMenuForbidParent": "The 'Customized Menu' must be leaf menu, can not have child!",
        "menuListTitle": "Menu List",
        "selectedMenuTitle": "Selected Menu",
        "selectedPanelTips": "Add a menu from the menu list on the left",
        "saveBtn": "Save",
        "cancelBtn": "Cancel",
        "saveSuccess": "Save successfully!",
        "saveFail": "Save failed!"
      }
    },
    "zh_CN": {
      "title": "banner",
      "banner": {
        "create":"创建",
        "delete":"删除",
        "noCustomMenu": "必须添加'租户自定义菜单'到新的菜单列表中，否则后续将无法编辑菜单！",
		"CustomMenuForbidParent": "'租户自定义菜单' 必须是叶子菜单，不能有子菜单!",
        "menuListTitle": "菜单列表",
        "selectedMenuTitle": "已选菜单",
        "selectedPanelTips": "从左侧菜单列表添加菜单",
        "saveBtn": "保存",
        "cancelBtn": "取消",
        "saveSuccess": "保存成功",
        "saveFail": "保存失败"
      },
      "prompt":{
        "button":{
          "ok":"确认"
        }
      }
    }
  }
  
</i18n>