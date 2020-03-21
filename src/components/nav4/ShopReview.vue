<template>
  <div id="SHOPREVIEW">
    <el-header style="height: 42px;" class="header">
      <el-row>
        <el-col :span="2">
          <img src="../../../static/img/back.png" class="img" alt="img" @click="go('/main/shopManage')">
        </el-col>
        <el-col :span="20">商家申请审核</el-col>
        <el-col :span="2">
          <img src="../../../static/img/home.png" class="img" alt="img" @click="go('/main/index')">
        </el-col>
      </el-row>
    </el-header>
    <div class="shopreview-box">
      <dl class="text text-info">
        <dd class="item1">店铺名称:</dd>
        <dd class="item">{{info_name}}</dd>
      </dl>
      <dl class="text text-info">
        <dd class="item1">店铺电话:</dd>
        <dd class="item">{{info_tel}}</dd>
      </dl>
      <dl class="text text-info">
        <dd class="item1">店铺公众号:</dd>
        <dd class="item">{{info_WX}}</dd>
      </dl>
      <dl class="text text-info">
        <dd class="item1">店铺地址:</dd>
        <dd class="item">{{info_address}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺描述:</dd>
        <dd class="item" style="width: 100%;">{{info_text}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺图标:</dd>
        <dd class="item">
          <img :src="info_img" alt="img" @error="defImg" class="info-img" @click="showIcon(info_img)"/>
        </dd>
      </dl>
      <dl>
        <dd class="item1">店铺轮播图:</dd>
        <dd class="img-box">
          <div class="img-box-item" v-for="(item,index) in tableData" :key="index">
            <img :src="item.imageUrl" alt="img" @click="showImg(item)" @error="defImg">
          </div>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺详情介绍:</dd>
        <dd>
          <div class="shop-info">
            <div v-html="shop_Info" ref="intro" class="info ql-editor" style="padding: 0px;"></div>
          </div>
        </dd>
      </dl>
    </div>
    <div style="width: 100%; display:flex; border-top: 1px solid #EAEDF4;">
      <div style="width:calc(50% - 1px); border-right: 1px solid #EAEDF4;">
        <el-button :disabled="pass_Info" @click="passReview(false)" type="text" style="width: 100%; padding: 7px 0px;">审核不通过</el-button>
      </div>
      <div style="width:50%;">
        <el-button :disabled="pass_Info" @click="passReview(true)" type="text" style="width: 100%; padding: 7px 0px;">审核通过</el-button>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible2" fullscreen>
      <div class="show-img-box">
        <img :src="imgView" alt="img" style="width: 100%;" @error="defImg">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data(){
    return{
      pkId:"",
      ccoicId:"",
      info_name: "",
      info_tel: "",
      info_WX: "",
      info_address: "",
      info_text: "",
      info_img: "./static/img/zhanwei.jpg",
      shop_Info: "",
      tableData:[],
      pk_id:"",
      pass_Info:true,
      // 图片
      dialogVisible2:false,
      imgView:""
    }
  },
  watch:{
    $route: {
      handler: function() {
        this.ccoicId = this.$route.query.ccoicId;
        this.pkId = this.$route.query.pkId;
      },
      immediate: true
    }
  },
  created(){
    this.getData();
    this.getName();
  },
  methods:{
    showDefImage(){
      event.target.src = "./static/img/zhanwei.jpg";
    },
    go(url){
      this.$router.push({path: url});
    },
    getName(){
      let OpenId = sessionStorage.getItem("OpenId");
      let getUser = axios.getUser(OpenId);
      getUser.then((res) => {
        if(res.data.msg == 'OK'){
          this.user = res.data.data.ccoicName;
          sessionStorage.setItem("id",res.data.data.pkId);
        }else{
          this.$message.error(res.data.msg);
          this.$router.push({path: '/login'});
          sessionStorage.removeItem("OpenId");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("appid");
        }
      })
    },
    getData(){
      let OpenId = sessionStorage.getItem("OpenId");
      let obj = {
        fkBusinessId: this.pkId,
        ccoicId: this.ccoicId,
        OpenId: OpenId
      };
      let showReview = axios.showReview(obj);
      showReview.then(res => {
        if(res.data.msg == "OK"){
          let data = res.data.data.ChangeApply;
          this.info_name = data.shopName;
          this.info_tel = data.tel;
          this.info_WX = data.shopURL;
          this.info_address = data.shopSite;
          this.info_text = data.shopDescribe;
          this.tableData = res.data.data.ImageCarouselApply;
          this.shop_Info = data.homepageCcontent;
          this.info_img = data.shopIcon;
          this.pass_Info = data.applyForComplete;
          this.pk_id = data.fkBusinessId;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    showImg(data){
      this.imgView = data.imageUrl;
      this.dialogVisible2 = true;
    },
    showIcon(data){
      this.imgView = data;
      this.dialogVisible2 = true;
    },
    defImg() {
      event.target.src = "./static/img/zhanwei.jpg";
    },
    passReview(data) {
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let obj = {
        pkId:this.pk_id,
        fkBusinessId:this.pk_id,
        fkCcoicId:fkId,
        pass:data,
        applyForComplete:true,
        shopName:this.info_name,
        shopDescribe:this.info_text,
        shopIcon:this.info_img,
        homepageCcontent:this.shop_Info,
        OpenId:OpenId
      };
      let passReview = axios.passReview(obj);
      passReview.then(res => {
        if(res.data.msg == "OK"){
          this.$message.success("审核完成");
          setTimeout(() => {
            this.$router.push({path:'/main/shopManage'});
          },3000);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
#SHOPREVIEW{
  background-color: white;
}
.header {
  padding: 10px 15px;
  background-color: #393D49;
  color: white;
}
.img{
  width: 22px;
  height: 22px;
}
.shopreview-box{
  height: calc(100vh - 78px);
  padding-top: 5px;
  width: 94%;
  margin: auto;
  overflow-y: scroll;
  font-size: 0.9em;
}
dd,dl {
  margin: 0px;
}
.text {
  margin-top: 5px;
  margin-bottom: 5px;
}
.text:first-of-type{
  margin-top: 0px;
}
.item {
  text-align: left;
  word-wrap: break-word;
}
.item1 {
  text-align: left;
  margin-bottom: 5px;
}
.text-info {
  display: flex;
  align-items: center;
}
.text-info .item1 {
  margin-right: 5px;
}
.text-info .item {
  margin-bottom: 5px;
}
.shop-info{
  width: 99%;
  height: 0px;
  padding-bottom: 50%;
  overflow-y: scroll;
  position: relative;
  border: 1px solid black;
}
.shop-info div{
  width: 100%;
  height: 100%;
  position: absolute;
}
.info-img{
  width: 45%;
  height: 45%;
}
.img-box{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.img-box-item{
  width: calc(100%/4 - 2%);
  height: 0px;
  padding-bottom: 20%;
  position: relative;
  margin-right: 2%;
  margin-top: 2%;
}
.img-box-item:nth-of-type(1),
.img-box-item:nth-of-type(2),
.img-box-item:nth-of-type(3),
.img-box-item:nth-of-type(4){
  margin-top: 0px;
}
.img-box-item:last-of-type{
  margin-right: 0px;
}
.img-box-item img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
.show-img-box{
  width: calc(100% - 10px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>