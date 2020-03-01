<template>
  <div id="bannerSetting">
    <div class="bannerSetting">
      <div class="bannerSetting-content">
        <LayoutPanel class="layout-panel"
                     title="设置">
          <div>
            <el-button type="primary"
                       icon="el-icon-plus"
                       circle
                       @click="addBanner;"
                       v-popover:popover2></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle
                       @click="deleteBanner"></el-button>
          </div>
          <div class="tree-one-box"
               ref="dragTreeBox"
               v-show="bannerData.length>0">
            <div class="tree-one"
                 ref="dragTree">
              <Tree :data="bannerData"
                    ref="targetTree"
                    :space="6"
                    openedClass="tree-child"
                    :draggable="true"
                    :options="{handle:'icon_edit',animation:100}"
                    @drag="onDrag"
                    @drop="onDrop">
                <div slot-scope="{data}">
                  <el-popover placement="right"
                              ref="popover"
                              trigger="click">

                    <el-form ref="viewform">
                      <el-form-item label="图标">
                        <el-input v-model="data.icon_class"></el-input>
                      </el-form-item>
                      <el-form-item label="名称">
                        <el-input v-model="data.name"></el-input>
                      </el-form-item>
                      <el-form-item label="跳转连接">
                        <el-input v-model="data.link"></el-input>
                      </el-form-item>
                      <el-form-item size="large">
                        <el-button type="primary"
                                   @click="onSubmit(data)">保存</el-button>
                        <el-button @click="popoverEditVisiable=false">关闭</el-button>
                      </el-form-item>
                    </el-form>
                    <div slot="reference"
                         class="name-wrapper">
                      <div :class="['tree-content',{'tree-drop-not':!data.isDragPlaceHolder&&dragging&&!data.droppable}]">
                        <el-checkbox label=""
                                     v-model="data.checked"></el-checkbox>
                        <span :class="data.icon_class"
                              style="margin-left:18px"></span>
                        <span :class="['label-content','label-padding']">{{getDisplayName(data)}}</span>
                        <span class="icon_ide_edit"></span>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </Tree>
            </div>
          </div>
          <el-popover placement="right"
                      trigger="click"
                      ref="popover2"
                      v-model="popoverVisible"
                      class="popover-content">
            <el-form ref="viewform"
                     :model="bannerForm">
              <el-form-item label="图标">
                <el-input v-model="bannerForm.icon"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="bannerForm.name"></el-input>
              </el-form-item>
              <el-form-item label="跳转连接">
                <el-input v-model="bannerForm.link"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary"
                           @click="addBanner">保存</el-button>
                <el-button @click="popoverVisible = false">关闭</el-button>
              </el-form-item>
            </el-form>
          </el-popover>
          <div class="exit">
            <el-checkbox disabled></el-checkbox>
            <span class="icon_logout"
                  style="margin-left:18px"></span>
            <span style="margin-left:15px;">退出登录</span>
          </div>
        </LayoutPanel>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { DraggableTree } from "vue-draggable-nested-tree";
import LayoutPanel from "./layoutPanel";
import axios from 'axios';
import mockAxios from "../../../mock/axios-mock-adapter";
export default {
  name: "banner",
  components: {
    Tree: DraggableTree,
    LayoutPanel
  },
  data () {
    return {
      isShowRuler: true,
      isShowConfirmDialog: false,
      isShowInfo: false,
      dragging: false,
      popoverVisible: false,
      maxTreeLevel: 1,
      showNextEdit: false,
      popoverEditVisiable: false,
      bannerData: [],
      bannerForm: {
        // id: ,
        name: null,
        sort: null,
        icon_class: null,
        checked: null,
        link: null,
        isEditable: null
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.initData();
  },
  methods: {
    async initData () {
      const result = await axios.get('/banner/getList').then(function (response) {
        // handle success
        console.log(response.data);
        if (response && response.data) {
          return response.data
        }
      });
      this.bannerData = result;
    },
    //拖拽操作
    onDrag () {
      this.dragging = true;
      //根据拖拽位置更新动画
      this.checkScrollBarr(node);
      //控制菜单级数
      let nodeLevels = 1
      this.depthFirstSearch(node, chirdNode => {
        if (chirdNode._vm.level > nodeLevels) {
          nodeLevels = chirdNode._vm.level
        }
      });
      nodeLevels = nodeLevels - node._vm.level + 1;
      const childNodeMaxLevel = this.maxTreeLevel - nodeLevels;
      this.depthFirstSearch(this.bannerData, childNode => {
        if (childNode !== node) {
          const droppable = !childNode.page &&
            childNode._vm && childNode._vm.level <= childNodeMaxLevel;
          this.$set(chirdNode, "droppable", droppable);
        }
      })
    },
    depthFirstSearch (obj, handler, childrenKey = 'children', reverse) {
      const rootChildren = Array.isArray(obj) ? obj : [obj];
      const stopException = () => { };
      const func = (children, parent) => {
        if (reverse) {
          children = children.slice();
          children.reverse();
        }
        const len = children.length;
        for (let i = 0; i < len; i++) {
          const item = children[i];
          const r = handler(item, i, parent)
          if (r === false) {
            throw new StopException();
          } else if (r === "skip children") {
            continue;
          } else if (r === "skip siblings") {
            break;
          }
          if (item[childrenKey] != null) {
            func(item[childrenKey], item)
          }
        }
      };
      try {
        func(rootChildren)
      } catch (e) {
        if (e instanceof StopException) {
          //stop
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
      const root = this.$refs['dragTree'];
      const rootHeight = root.offsetHeight;
      function check () {
        const ele = document.getElementsByClassName("dragging")[0];
        if (!ele) {
          return;
        }
        const offset = ele.offsetTop;
        const distanceButtom = rootHeight - offset;
        const distanceTop = offset;
        if (distanceButtom < critical) {
          root.scrollTop += 5;
        } else if (distanceTop < critical) {
          root.scrollTop -= 5;
        }
        if (this.dragging) {
          requestAnimationFrame(check.bind(this));
        }
      }
      //浏览器在下次重绘之前指定回调函数更新动画
      requestAnimationFrame(check.bind(this));
    },
    //将树形结构产生的多余数据删除
    getTreePureData (node) {
      const t = Object.assign({}, node);
      delete t._id;
      delete t.parent;
      delete t.children;
      delete t.active;
      delete t.style;
      delete t.class;
      delete t.innerStyle;
      delete t.innerBackStyle;
      delete t.innerBackClass;
      for (const key of Object.keys[t]) {
        if (key[0] == '_') {
          delete t[key];
        }
      }
      return t;
    },
    editBanner (row) {
      this.popoverVisible = true
      console.log("edit", this.popoverVisible)
    },
    getDisplayName (data) {
      return data.name;
    },
    addBanner () {
      this.popoverVisible = true
      console.log("addBanner")
    },
    deleteBanner () {
      console.log(this.$refs.targetTree)
      let ary = this.$refs.targetTree.data
      debugger
      //删除选择的元素
      if (ary) {
        for (var i = 0; i < ary.length; i++) {
          if (ary[i].checked == true) {
            ary.splice(i, 1);
          }
        }
        // array.forEach(a => {
        //   debugger;
        //   if (a.checked == true) {
        //     array.splice(array[a], 1)
        //   }
        // });
      }
    },
    addBanner () {
      debugger;
      this.bannerForm.sort = this.bannerData.length + 1;
      this.bannerData.push(this.bannerForm);
      this.popoverVisible = false;

    },
    onSubmit (data) {
      debugger
      console.log("save", data)
      this.popoverEditVisiable = false;
    },
    closeForm (data) {
      this.popoverEditVisiable = false;
      debugger
    }
  }
}
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
}
#bannerSetting {
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
  .bannerSetting {
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #e6eaf2;
    padding: 25px 40px;
  }
  .bannerSetting-content {
    display: flex;
    align-items: center;
    margin-top: 10px;
    height: calc(100% - 120px);
    width: 320px;
  }
  .bannerSetting-select {
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
</style>