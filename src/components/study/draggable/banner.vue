<template>
  <div id="bannerSetting">
    <div class="bannerSetting">
      <div class="bannerSetting-content">
        <LayoutPanel class="layout-panel"
                     title="设置">
          <div>

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
                              trigger="click">
                    <el-table :data="bannerData">
                      <el-table-column label="text"
                                       proptery="text"
                                       width="150"></el-table-column>
                      <el-table-column label="dd"
                                       proptery="checked"
                                       width="150"></el-table-column>
                    </el-table>
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
      maxTreeLevel: 1,
      showNextEdit: false,
      bannerData: [
        {
          text: "个人设置",
          sort: "1",
          icon_class: "icon_copy",
          checked: "true"
        },
        {
          text: "切换租户",
          sort: "2",
          icon_class: "icon_copy",
          checked: "true"
        },
        {
          text: "语言切换",
          sort: "3",
          icon_class: "icon_copy",
          checked: "true"
        },
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {

  },
  methods: {
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
      console.log("edit")
    },
    getDisplayName (data) {
      return data.text;
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

  .bannerSetting {
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #efeaf2;
    padding: 25px 40px;
  }
}
.bannerSetting-content {
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: calc(100%-120px);
  width: 320px;
}
.tree-one-box {
  position: relative;
  height: 100%;
  overflow: hidden;
  user-select: none;
}
.label-content {
  display: inline-block;
  max-width: calc(100%-60px);
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
    // .tree-active;
  }
}

.exit {
  margin: 0px 17px 17px 17px;
  border-top: 1px solid #e6eaf2;
  padding-top: 17px;
}
</style>