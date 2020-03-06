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
                        <file-input name="fileInput" ref="fileInput" :multiple="false" fileTypeExts="png,jpg,jpeg" id="fileInput"></file-input>
                    </div>
                </a-col>
                <a-col :span="6">
                    <img :src="src" />
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
import FileInput from "@adc/adc-ui/lib/file-input";
import FormPanel from "@adc/adc-ui/lib/form-panel";
import ACol from "@adc/adc-ui/lib/col";
import ARow from "@adc/adc-ui/lib/row";
import AButton from "@adc/adc-ui/lib/button";
import $ from "jquery";
import { Spl} from "@adc/adc-ui/lib/utils/adapter";
import axios from "axios";
import eventBus from "@adc/adc-ui/lib/utils/event-bus";
export default {
    components:{FileInput,FormPanel,AButton,ACol,ARow},
  data(){
      return{
          confirm:this.$t("themeList.confirm"),
          cancel:this.$t("themeList.cancel"),
          src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANHSURBVHhe7d1NCuowEADg6EbQM7gV7yEiuBLBw3gCbyKCIOKVXHsAN77HBPKeP23zNzOZNOlO6iTtR2ozaRoH+/3+j6pbsMDhcBgMAHE0Gqndbqem02lwYSUF3u93dT6f1fP5VIA4hJNfr9fqer0q2Fm3boHH46Fut5s2M5tGnM/narPZVEhLCwLA0+mkFouFNvtAhA9wKVfIdsU2QIjQLdFsFbIZsQvwB7G2yF9EG2AjYoX8D+kC2IpYIZVyBexELBnSB9CKWCKkL6ATYkmQIYDOiCVAQrbW1JG29L/17o9+oi0A+pGr1UrnjX1KEU0u/J2J2DzMfi9ECJrNZjpv7AukAYRzek/lXAG9W6IpGCrrAyQGYDAiBOYOiQUYhZgzJCZgNGKOkNiAKIg5QVIAoiHmAEkFiIooGZISEB1RIiQ1IAmiJEgOQDJECZBcgKSI75CXy4U114bRGHgEHJPKkad9PhVAZrPdbtkex5rhrOVyGZwL+5wfeUs0B8P1FDF0PNAX7fv73qM4oRVSQ6YCZGuJ1C0yJSA7IlSI3SJTAyZBxISUAJgMEQNSCmBSxBhISYDJEUMgpQGKQPSBlAgoBtEFUiqgKMQuSMmA4hCbIKUDikT8hgyd2hGanobEseXOvgc3Ho/VcDhUr9dLTSYT33DW74tEfL+Ec5iMLw7x+zcQO9emaKKiENtuItIhxSDa7sKSIUUg2gCpxyNjL/HkiK6AkiGTIvoCSoVMhhgKKBEyCWIsoDRIdkQsQEmQrIjYgFIg2RCpACVAsiBSA6aGJEeE2VnH4/Hnlf/YDm5bfIrMhhTRTG/jnFxkxiOhTq4XlsgQOecHNrVKzvdsSBBTAxpULkh0RCmAnJCoiNIAuSDREKUCckCiIEoHpIaMRswFkBIyCjE3QCrIYMRcASkggxBzB8SG9EbsCyAmpBcijMaYBRhDF52gGniIKddkNqELcTojcg1nxWDExMYsxOmE2HfA2PFIK2IpgDGQnYilAYZCtiKWChgC2YhYOqAv5A9iBfy8x7s8s/lArIDNnSQb5D/ECtjdy+yC1IgxCzDGdHBzi22D1IjwaDF0AcbcIGKP930hTlOW/heM2IJLjod/wSj5/NHO/S9ToJyPzxhGKgAAAABJRU5ErkJggg==",
          cancelSrc:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANHSURBVHhe7d1NCuowEADg6EbQM7gV7yEiuBLBw3gCbyKCIOKVXHsAN77HBPKeP23zNzOZNOlO6iTtR2ozaRoH+/3+j6pbsMDhcBgMAHE0Gqndbqem02lwYSUF3u93dT6f1fP5VIA4hJNfr9fqer0q2Fm3boHH46Fut5s2M5tGnM/narPZVEhLCwLA0+mkFouFNvtAhA9wKVfIdsU2QIjQLdFsFbIZsQvwB7G2yF9EG2AjYoX8D+kC2IpYIZVyBexELBnSB9CKWCKkL6ATYkmQIYDOiCVAQrbW1JG29L/17o9+oi0A+pGr1UrnjX1KEU0u/J2J2DzMfi9ECJrNZjpv7AukAYRzek/lXAG9W6IpGCrrAyQGYDAiBOYOiQUYhZgzJCZgNGKOkNiAKIg5QVIAoiHmAEkFiIooGZISEB1RIiQ1IAmiJEgOQDJECZBcgKSI75CXy4U114bRGHgEHJPKkad9PhVAZrPdbtkex5rhrOVyGZwL+5wfeUs0B8P1FDF0PNAX7fv73qM4oRVSQ6YCZGuJ1C0yJSA7IlSI3SJTAyZBxISUAJgMEQNSCmBSxBhISYDJEUMgpQGKQPSBlAgoBtEFUiqgKMQuSMmA4hCbIKUDikT8hgyd2hGanobEseXOvgc3Ho/VcDhUr9dLTSYT33DW74tEfL+Ec5iMLw7x+zcQO9emaKKiENtuItIhxSDa7sKSIUUg2gCpxyNjL/HkiK6AkiGTIvoCSoVMhhgKKBEyCWIsoDRIdkQsQEmQrIjYgFIg2RCpACVAsiBSA6aGJEeE2VnH4/Hnlf/YDm5bfIrMhhTRTG/jnFxkxiOhTq4XlsgQOecHNrVKzvdsSBBTAxpULkh0RCmAnJCoiNIAuSDREKUCckCiIEoHpIaMRswFkBIyCjE3QCrIYMRcASkggxBzB8SG9EbsCyAmpBcijMaYBRhDF52gGniIKddkNqELcTojcg1nxWDExMYsxOmE2HfA2PFIK2IpgDGQnYilAYZCtiKWChgC2YhYOqAv5A9iBfy8x7s8s/lArIDNnSQb5D/ECtjdy+yC1IgxCzDGdHBzi22D1IjwaDF0AcbcIGKP930hTlOW/heM2IJLjod/wSj5/NHO/S9ToJyPzxhGKgAAAABJRU5ErkJggg=="
      }
  },
  methods:{
      confirmChange(){
        this.$emit("selectedLogo",this.src)
      },
      cancelChange(){
        //   parent.$(".prompt-header-tool-btn").click()
        // window.parent.document.getElementsByClassName("prompt-header-tool-btn")[0].click()
        this.$emit("closePop",false)
      }
  },
  created(){
      
  },
  mounted(){
    let self = this;
       Spl.EventBus.register("fileInput","value-change",function(dataField){
            let oFReader=new FileReader();
            if(dataField.fileList.length !==0 ){
                oFReader.readAsDataURL(dataField.fileList[0].raw);    
                oFReader.onload=function(oFReader){
                    var src=this.result;
                    self.src = src
                }
            }else{
                self.src = self.cancelSrc;
            }
        })
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
        // width:100%;
        // height:100%;
        background-color:#C2C2C2;
    }
    .adc-input{
        position:relative;
        top:calc(50% - 20px);
        left:calc(50% - 55px);
        /deep/ button{
            width:110px;
            height:40px;
            font-family: PingFangSC-Regular, "PingFang SC";
            font-weight: 400;
            font-style: normal;
            font-size: 16px;
            border: none;
            span{
                color: rgb(51, 51, 51);
            }
            // background: inherit;
            // background-color: rgba(255, 255, 255, 1);
            // box-sizing: border-box;
        }
        /deep/ el-popover{
            display:none !important;
        }
        /deep/ .el-upload__tip{
            display:none !important;
        }
    }
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
      .el-message-box__wrapper{
          z-index:2006 !important;;
        // .el-message-box{
        //     width:80% !important;
        //     // 380px
        // }
    }
</style>
<i18n>
    {
    "en":{
    "themeList":{
        "title":"Engineering Configuration",
        "confirm":"confirm",
        "cancel":"cancel"
    }
    },
    "zh_CN":{
    "themeList":{
        "title":"工程配置",
        "confirm":"确认",
        "cancel":"取消"
    }
    }
    }
</i18n>

