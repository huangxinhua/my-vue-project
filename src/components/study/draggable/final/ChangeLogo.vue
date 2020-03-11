<template>
    <div class="changeLogoDiv">
        <form-panel ref="form" :layoutType="'horizontal'">
            <a-row type="flex">
                <a-col>
                    <span>{{this.$t("themeList.title")}}</span>
                    <div @click="cancelChange">X</div>
                </a-col>
            </a-row>
            <a-row type="flex">
                <a-col :span="18">
                    <div class="upPictureBack">
                        <div @click="upfile">
                            <span>{{this.$t("themeList.uploadPic")}}</span>
                            <input type="file" @change="filechange" :multiple="false" accept=".png,.jpg,.jpeg,.svg" ref="fileInput"/>
                        </div>
                    </div>
                </a-col>
                <a-col :span="6">
                    <img :src="src"/>
                </a-col>
            </a-row>
            <a-row type="flex" align="middle">
                <a-col>
                    <a-button :text="confirm" @click="confirmChange"></a-button>
                    <a-button :text="cancel" @click="cancelChange"></a-button>
                </a-col>
            </a-row>
        </form-panel>
    </div>
</template>

<script>
import FormPanel from "@adc/vigour-ui/lib/form-panel";
import ACol from "@adc/vigour-ui/lib/col";
import ARow from "@adc/vigour-ui/lib/row";
import AButton from "@adc/vigour-ui/lib/button";
const imgUrl = require('../images/default.png')
export default {
    components:{FormPanel,AButton,ACol,ARow},
  data(){
      return{
            confirm:this.$t("themeList.confirm"),
            cancel:this.$t("themeList.cancel"),
            src:imgUrl,
            cancelSrc:imgUrl,
            fileName:""
      }
  },
  methods:{
      confirmChange(){
        this.$emit("selectedLogo",{src:this.src,fileName:this.fileName})
      },
      cancelChange(){
        this.$emit("closePop",false)
      },
      filechange(evt){
        evt = window.event || evt
        let self = this;
        const files = evt.target.files
        let oFReader=new FileReader();
        if(files.length !==0 ){
            let file = files[0];
            self.fileName = file.name;
            let size = file.size;
            if(size>1024*1024){//1M
                this.$notify({
                    title: this.$t("themeList.notifyTitle"),
                    message: this.$t("themeList.notifyMessage"),
                    type: "warning",
                    customClass:"changeLogoNotify",
                    duration: 2000
                });
                return;
            }
            let type = file.type;
            if(type.indexOf("svg")!==-1){
                oFReader.readAsText(file, "UTF-8")
                oFReader.onload = function(e){
                    const fileString = e.target.result
                    let svgSrc = "";
                    if(fileString.indexOf("<image")!==-1){
                        let objE = document.createElement("div");
                        objE.innerHTML = fileString;
                        objE.childNodes.forEach((curValue)=>{
                            if(curValue.nodeName==='svg'){
                                svgSrc = curValue.getElementsByTagName("image")[0].getAttribute("xlink:href")
                                return;
                            }
                        });
                    }else{
                        svgSrc = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(fileString)))
                    }
                    self.src = svgSrc;
                }
                return;
            }else{
                oFReader.readAsDataURL(file);    
                oFReader.onload=function(){
                    let src=this.result;
                    self.src = src;
                }
            }
        }else{
            self.src = self.cancelSrc;
            self.fileName=""
        }
      },
      upfile(){
          this.$refs.fileInput.click();
      }
  }
}
</script>

<style lang="less" scoped>
.changeLogoDiv{
    width: 477px;
    height: 481px;
    background-color:#fff;
    .upPictureBack{
        width:322px;
        height:294px;
        background-color:#C2C2C2;
        div{
            background-color:#fff;
            width:110px;
            height:40px;
            font-family: PingFangSC-Regular, "PingFang SC";
            font-weight: 400;
            font-style: normal;
            font-size: 16px;
            border: none;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            position:relative;
            top:calc(50% - 20px);
            left:calc(50% - 55px);
            span{
                color: rgb(51, 51, 51);
            }
            input{
                display: none;
            }
        }
    }
    //title
    .el-row--flex:first-of-type{
        margin-bottom:10px;
        .el-col{
            padding:0px;
            span{
                font-size:18px;
            }
            div{
                float: right;
                width: 25px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                display: table-cell;
                cursor: pointer;
            }
        }
    }
    .el-row--flex:nth-of-type(2){
        .el-col-6{
            img{
                float: right;
                width:78%;
            }
        }
    }
    //buttons
    .el-row--flex:last-of-type{
        .el-col{
            text-align:center;
            .ows_button{
                width: 110px;
                height: 40px;
                background: inherit;
                background-color: rgba(246, 111, 106, 1);
                border: none;
                border-radius: 2px;
                -moz-box-shadow: none;
                -webkit-box-shadow: none;
                box-shadow: none;
                color: #FFFFFF;
                text-align:center;
                line-height:40px;
                /deep/ span{
                    font-family: 'PingFangSC-Regular', 'PingFang SC';
                    font-weight: 400;
                    font-style: normal;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
<style lang="less">
.el-notification{
    &.changeLogoNotify{
        z-index:2006 !important;
    }
}
</style>
<i18n>
    {
    "en":{
    "themeList":{
        "title":"Engineering Configuration",
        "confirm":"confirm",
        "cancel":"cancel",
        "uploadPic":"upload picture",
        "notifyTitle":"prompt",
        "notifyMessage":"Image size exceeds 1M"
    }
    },
    "zh_CN":{
    "themeList":{
        "title":"工程配置",
        "confirm":"确认",
        "cancel":"取消",
        "uploadPic":"上传图片",
        "notifyTitle":"提示",
        "notifyMessage":"图片大小超过1M"
    }
    }
    }
</i18n>

