<template>
  <div class="e_banner_right">
    <div id="systemSettingClickArea">
      <div id="systemSetting" @click="showMenu">
        <i class="portal-icons icon-nav-avatar" style="display: none;"></i>
        <div
          class="banner_avatar el-icon-user-solid"
          style="display: inline-block;margin-right: 8px;"
        >
          <!-- <img src="/servicecreator/style/simple/images/ows/users.png"
          style="width:28px;height:28px;border-radius:50%" />-->
        </div>
        <span title="admin" class="userNameContent" style="margin-right: 5px;font-size: 15px;">admin</span>
        <i class="portal-icons icon-drop-down transformIcon"></i>
        <i id="arrow" :class="[isMenuShow ? 'el-icon-caret-top': 'el-icon-caret-bottom']"></i>
      </div>
    </div>
    <div class="cascaderMenu" ref="cascaderMenu" v-if="isMenuShow">
      <!-- <i class="arrowIcon icon-arrow-drop-right"></i> -->
      <ul class="firstMenu">
        <li
          class="menuItem"
          v-for="item in bannerData"
          :key="item.id"
          @click="submitLink(item)"
          @mouseover="event=>{displaySubMenu(event,item,true)}"
          @mouseout="event=>{displaySubMenu(event,item,false)}"
        >
          <i class="navIcon">
            <img class="bannerImg" :src="item.icon" />
          </i>
          <span>{{ item.name }}</span>
        </li>
        <li class="menuItem logoutItem" @click="logout">
          <i class="navIcon">
            <img
              class="bannerImg"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH4SURBVFhH7ZZPSwJBGIf7gBIEQuDRkyCIJ8F7X8FTx0DyGEgehMKDhF4MwYsihF4EAxEhEIS3HmaG0WVmZ7SCCB8Ymn3//Obnxr67F/JHOBtJcjaS5GwkyT8xMpmo9QPEG1mtRFotkfVaXfP38lKt/Rg11B5JnJFuV+T6WiSTEanVVGyxUNcs9kCOa2rpOYKwkYcHe2A2K9LrqbjLCDlqTJzeSNKNvLxY0VLJHgguI8CeWpPr93UiHb+RzUYkl1NixaLIx4dOaHxGgFpjBg20AviN3N0poasrkflcB/dIMwL00EserQB+I+Zu3N7qQILl0hph74Je8mgFcBsZj+0h7H08P6vlYzq1OuxTcBt5fFTNPAHfxTxF7bYOuHEbub9Xzfm8DnwDNNCq13XAjdsITT9tpNHQATduI09Pqpnxvd3q4AnQa56cTkcH3biNzGaqmTUY6OAJ0Gt00EzBbQQKBSVwc6MDJ0AvGgzEAH4jvEXNr4kc0we8vtr+ZlMH/fiN7HaHY9o1XX1QawYiGmgF8BuBtzc7BxCOebVz98wnA71oRJBuBEajw1d7taqm6fu7LviCDyFi5EwdPfRGEjYC/Kpy2R4SWtRG3glDnBHg/8x8qVTch7PIBeaFj3gj+/B9wYzg/cEaDqO+OdI4zcgvcDaS5I8YEfkEDlNBoGE+7ZgAAAAASUVORK5CYII="
            />
          </i>
          <span>退出登录</span>
        </li>
      </ul>
      <ul
        class="subMenu"
        :style="{ display: isDisplaySubMenu,top:subMenuStyle }"
        @mouseover="isDisplaySubMenu='block'"
      >
        <li class="menuItem" v-for="item in subMenu" :title="item.title" :key="item.title">
          <img :src="item.img" />
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import './bannerAxiosMock';
import $ from "jquery";
// import { NfUtil } from "@adc/adc-ui/lib/utils/adapter";
export default {
  name: "bannerNav",
  data () {
    return {
      bannerData: [],
      isMenuShow: false,
      isDisplaySubMenu: 'none',
      subMenu: [],
      subMenuStyle: null
    }
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
      console.log("initdata,", this.bannerData);
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
              item.subMenu = subMenuResult;
            }
          }
        }
      }
    },
    showMenu () {
      this.isMenuShow = !this.isMenuShow;
      event.stopPropagation();
    },
    submitLink (data) {
      debugger
      // let url = data.link;
      // if (!url) {
      //   return;
      // }
      // let root = window.location.href;
      // let context = NfUtil.getRootContext();
      // // 本地调试
      // if (root.indexOf("localhost") > -1) {
      //   context = "";
      // }
      // if (url.indexOf("http://") != -1 || url.indexOf("https://") || url.indexOf("wwww.") != -1) {
      //   root = url
      // } else {
      //   //相对路径
      //   url = context + url;
      // }
      // if (top.NfLayout) {
      //   top.NfLayout.openTab(url, { target: "_self" });
      // } else {
      //   location.href = url;
      // }
    },
    displaySubMenu (event, parent, flag) {
      // console.log(event, 'data', parent, flag)
      if (parent && parent.subMenu && parent.subMenu.length > 0) {
        this.subMenu = parent.subMenu;
      } else {
        return
      }
      this.subMenuStyle = event.target.offsetTop + 'px';
      if (flag == true) {
        this.isDisplaySubMenu = 'block'
      } else {
        this.isDisplaySubMenu = 'none'
      }
    },
    showSubMenu () {
      console.log("showsub")
      this.isDisplaySubMenu = 'block'
    },
    logout () {
      console.log("logout")
    }
  }
}
</script>
<style lang="less" scoped>
.e_banner_right {
  display: flex;
  float: right;
  font-size: 14px;
  color: #ced2d8;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;
  .cascaderMenu {
    position: absolute;
    top: 50px;
    right: 0;
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
      // width: fit-content;
      // right: 112px;
      // position: absolute;
      // cursor: pointer;
      // overflow-y: auto;
      // margin-right: -3px;
      // box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08),
      //   0 -12px 24px 0 rgba(0, 0, 0, 0.08), 12px 0 24px 0 rgba(0, 0, 0, 0.08),
      //   -12px 0 24px 0 rgba(0, 0, 0, 0.08);
      right: 199px;
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
#systemSetting {
  cursor: pointer;
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
</style>