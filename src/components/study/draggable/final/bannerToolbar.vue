<template>
  <div class="e_banner_right" v-clickOutside="hideMenu">
    <div>
      <div class="systemSetting" @click="showMenuFn">
        <i class="icon-nav-avatar" style="display: none;"></i>
        <div class="banner_avatar">
          <img src="./images/users.png" />
        </div>
        <span title="admin" class="userNameContent">admin</span>
        <i id="arrow" :class="[showMenu ? 'el-icon-caret-top': 'el-icon-caret-bottom']"></i>
      </div>
    </div>
    <div class="cascaderMenu" ref="cascaderMenu" v-if="showMenu">
      <ul class="firstMenu">
        <li
          class="menuItem"
          v-for="item in bannerData"
          :key="item.id"
          @mousedown="firstMenuFn(item)"
          @mouseenter="showSubmenuFn(item,$event)"
        >
          <i class="navIcon">
            <img class="bannerImg" :src="item.icon" />
          </i>
          <span>{{ item.name }}</span>
          <i
            v-if="item.childrenMenu&&item.childrenMenu.length > 0"
            class="arrowIcon el-icon-arrow-right"
          ></i>
        </li>
        <li class="menuItem logoutItem" @click="logoutSys">
          <i class="navIcon">
            <img class="bannerImg" src="./images/logout.png" />
          </i>
          <span>{{this.$t("bannerNav.logout")}}</span>
        </li>
      </ul>
      <ul class="subMenu" :style="{top:subMenuPosition,right:subMenuRight}" v-show="showSubMenu">
        <li
          class="menuItem"
          v-for="item in subMenuList"
          :title="item.title"
          :key="item.title"
          @mousedown="subMenuFn(item)"
        >
          <img :src="require(`${item.img}`)" />
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
import './bannerAxiosMock';
import ClickOutside from "@adc/vigour-ui/lib/directives/clickoutside";
import { NfUtil } from "@adc/vigour-ui/lib/utils/adapter/nf";
export default {
  name: "BannerNav",
  data () {
    return {
      bannerData: [],
      showMenu: false,
      showSubMenu: false,
      selectedItemCode: null,
      subMenuList: [],
      subMenuPosition: 0,
      tenantLength: 0,
      menuWidth: "194px",
      subMenuRight: "200px"
    }
  },
  directives: {
    clickOutside: ClickOutside
  },
  components: {
  },
  computed: {
  },
  created () {
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
        this.bannerData = result;
      }
      await this.getServiceData();
    },
    async getServiceData () {
      //初始化banner之后，如果有服务的路径请求服务数据
      if (this.bannerData && this.bannerData.length > 0) {
        for (let i = 0; i < this.bannerData.length; i++) {
          const item = this.bannerData[i];
          //category url ;service
          if (item.category == "service" && item.service) {
            const subMenuResult = await axios.get(item.service).then(function (response) {
              // handle success
              if (response && response.data) {
                return response.data
              }
            });
            if (subMenuResult) {
              item.childrenMenu = subMenuResult;
            }
          }
        }
      }
    },
    openUrl (link) {
      if (link.indexOf("https://") != -1) {
        window.open(link)
      } else if (link.startsWith("www.")) {
        window.open("http://" + link)
      }
      location.href = `${NfUtil.getRootContext()}` + link
    },
    hideMenu () {
      //区域外点击，菜单隐藏
      this.showMenu = false;
    },
    showMenuFn () {
      this.showMenu = !this.showMenu;
    },
    firstMenuFn (itemData) {
      this.selectedItemCode = itemData.code;
      this.subMenuList = itemData.childrenMenu;
      if (!itemData.childrenMenu) {
        this.openUrl(itemData.link);
      }
      if (this.showSubMenu === false) {
        this.closeCascader();
      }
    },
    subMenuFn (item) {
      switch (this.selectedItemCode) {
        case "switchLanguage":
          //TODO
          break;
        case "switchApp":
          //TODO
          break;
        default:
          this.openUrl(item.link);
          break;
      }
      this.closeCascader();
    },
    showSubmenuFn (itemData, event) {
      //定义子菜单宽度
      this.subMenuRight = event.target.parentNode.offsetWidth + 5 + "px";
      if (itemData.childrenMenu && itemData.childrenMenu.length > 0) {
        //定义高度
        this.subMenuPosition = event.target.offsetTop + 'px';
        this.subMenuList = itemData.childrenMenu;
        this.showSubMenu = true;
      } else {
        this.showSubMenu = false;
      }
    },
    closeCascader () {
      this.showSubMenu = false;
      $(".cascaderMenu").hide();
    },
    logoutSys () {
    }
  }
}
</script>
<style lang="less" scoped>
.e_banner_right {
  display: flex;
  float: right;
  font-size: 14px;
  color: #fff;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;

  .cascaderMenu {
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 200;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.04);
    .firstMenu {
      min-width: 194px;
      max-width: 246px;
      max-height: 250px;
      background-color: white;
      text-align: left;
      display: inline-block;
      padding: 5px 0;
      border-radius: 2px;
      overflow-x: hidden;
      .menuItem {
        .navIcon {
          color: #94a0b6;
        }
        .bannerImg {
          height: 20px;
          width: 20px;
        }
      }
    }

    .subMenu {
      right: 194px;
      min-width: 194px;
      max-width: 246px;
      max-height: 250px;
      background-color: white;
      text-align: left;
      display: inline-block;
      padding: 5px 0;
      border-radius: 2px;
      overflow-x: hidden;
      position: absolute;
      overflow-y: auto;
      box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08),
        0 -12px 24px 0 rgba(0, 0, 0, 0.08), 12px 0 24px 0 rgba(0, 0, 0, 0.08),
        -12px 0 24px 0 rgba(0, 0, 0, 0.08);
      li {
        padding-right: 15px;
        list-style-type: none;
      }
    }
  }
}
.systemSetting {
  cursor: pointer;
  font-size: 18px;
  .banner_avatar {
    display: inline-block;
    margin-right: 8px;
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
  .userNameContent {
    margin-right: 5px;
    font-size: 15px;
  }
}
.menuItem {
  height: 36px;
  display: flex;
  align-items: center;
  color: #636669;
  border-radius: 2px;
  margin: 0 8px;
  padding: 0 10px;
  box-sizing: border-box;
  width: auto;
  span {
    margin: 0 16px 0 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.logoutItem {
  padding-top: 5px;
  border-top: 1px #eff2f8 solid;
}
.menuItem:hover {
  background: rgba(41, 121, 255, 0.1);
  color: #2979ff;
  opacity: 1;
}

.icon-arrow-drop-right {
  content: "\f103";
}
.arrowIcon {
  color: #94a0b6;
  font-size: 16px;
}
</style>
<i18n>
  {
    "zh_CN": {
      "bannerNav": {
        "logout":"退出登录"
      }
    },
    "en": {
      "bannerNav": {
        "logout":"Logout"
      }
    }
  }
</i18n>
