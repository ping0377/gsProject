<template>
  <div id="main">
    <el-container>
      <el-header style="height: 42px;" class="header">
        <el-row>
          <el-col :span="12" style="overflow: hidden;">
            <div class="border-left">
              <img class="img" src="../../static/img/menu.png" alt="img" @click="go('/menu')">
              <p class="text-left">{{title}}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="border-right">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img class="img" src="../../static/img/login.png" alt="img">
                  <p class="text-right">{{user}}</p>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="drop" style="border-bottom: 1px solid #888; padding-bottom: 5px;">
                    <div @click="go('/main/user')" style="overflow: hidden;">
                      <img src="../../static/img/ccic.png" alt="img" class="ico">
                      <p class="ico-text">协会信息</p>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item class="drop" style="padding-top: 5px;">
                    <div @click="dialogVisible = true" style="overflow: hidden;">
                      <img src="../../static/img/exit.png" alt="img" class="ico">
                      <p class="ico-text">退出登录</p>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height: calc(100vh - 42px); padding: 0px; padding-top: 0px;">
        <router-view/>
      </el-main>
    </el-container>
    <!-- 退出弹窗 -->
    <el-dialog
      title="确认退出？"
      :visible.sync="dialogVisible"
      width="80%"
      top="30vh">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      visible: false,
      title:"",
      user:"",
      dialogVisible: false,
      appId:"",
    }
  },
  mounted() {
    this.getName();
    if(axios.getUrlKey("code")){
      this.getWeChat();
      this.checkAppId();
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.title = this.$route.meta.title;
      },
      immediate: true
    }
  },
  methods: {
    go(url){
      this.$router.push({path: url});
    },
    getName(){
      let OpenId = sessionStorage.getItem("OpenId");
      let getUser = axios.getUser(OpenId);
      getUser.then((res) => {
        console.log(res);
        if(res.data.msg == 'OK'){
          this.user = res.data.data.ccoicName;
          if(!sessionStorage.getItem("id")){
            sessionStorage.setItem("id",res.data.data.pkId);
            this.getAppId(res.data.data.pkId);
          };
        }else{
          this.$message.error(res.data.msg);
          this.$router.push({path: '/login'});
          sessionStorage.removeItem("OpenId");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("appid");
          sessionStorage.removeItem("WeChat");
        }
      })
    },
    getAppId(id){
      let obj = {
        ccoicId:id
      };
      if(!sessionStorage.getItem('appid')){
        let getAppId = axios.getAppId(obj);
        getAppId.then(res => {
          console.log(res);
          if(res.data.msg == 'OK'){
            axios.fWechatLogin(res.data.data,'main/index');
          }else{
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    checkAppId(){
      if(!sessionStorage.getItem('appid')){
        sessionStorage.setItem('appid',axios.getUrlKey("code"));
      };
    },
    getWeChat(){
      if(!sessionStorage.getItem('WeChat')){
        let obj = {
          OpenId:sessionStorage.getItem("OpenId"),
          code:axios.getUrlKey("code")
        };
        let getWeChat = axios.getWeChat(obj);
        getWeChat.then(res => {
          console.log(res);
          if(res.data.msg == 'OK'){
            sessionStorage.setItem('WeChat','ok');
          }else{
            this.$message.error(res.data.msg);
          }
        });
      };
    },
    exit(){
      sessionStorage.removeItem("OpenId");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("appid");
      sessionStorage.removeItem("WeChat");
      this.dialogVisible = false;
      this.$router.push({ path: "/login" });
    }
  }
}
</script>

<style scoped>
.header {
  padding: 10px 15px;
  background-color: #393D49;
  color: white;
}
.border-left{
  float: left;
  height: 22px;
  overflow: hidden;
}
.text-left{
  margin: 0px;
  line-height: 23px;
  float: right;
  margin-left: 10px;
  font-size: 15px;
}
.border-right{
  float: right;
  height: 22px;
  overflow: hidden;
}
.text-right{
  margin: 0px;
  line-height: 23px;
  float: right;
  font-size: 15px;
  margin-left: 5px;
  color: white;
}
.img{
  width: 22px;
  height: 22px;
}
.drop{
  height: 24px;
  padding-left: 10px;
  padding-right: 10px;
}
.ico{
  width: 20px;
  height: 20px;
}
.ico-text{
  margin: 0px;
  float: right;
  line-height: 25px;
  margin-left: 10px;
}
</style>
