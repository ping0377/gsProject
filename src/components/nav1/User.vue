<template>
  <div id="User">
    <el-card class="box-card">
      <!-- 1 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          登录电话
        </dd>
        <dd class="text">
          <span class="info" style="margin-left: 3px;">{{userData.tel}}</span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="dialogVisible1 = true;">修改电话</el-button>
        </dd>
      </dl>
      <!-- 2 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          登录密码
        </dd>
        <dd class="text">
          <span style="margin-left: 3px;">*******</span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="dialogVisible2 = true">修改密码</el-button>
        </dd>
      </dl>
      <!-- 3 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          邮箱
        </dd>
        <dd class="text">
          <span class="info" style="margin-left: 3px;">{{userData.email}}</span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="dialogVisible3 = true">修改邮箱</el-button>
        </dd>
      </dl>
      <!-- 4 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          申请表
        </dd>
        <dd class="text">
          <span class="info" style="margin-left: 3px;">{{fileName}}</span>
        </dd>
        <dd class="button">
          <label for="upfile1" class="mini-button">上传文件</label>
          <input type="file" id="upfile1" ref="upfile1" @change="upDoc">
        </dd>
      </dl>
      <!-- 5 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          入会协议
        </dd>
        <dd class="text">
          <span style="margin-left: 3px;"></span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="goProtocol()">编辑协议</el-button>
        </dd>
      </dl>
      <!-- 6 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          缴费说明
        </dd>
        <dd class="text">
          <span style="margin-left: 3px;"></span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="go()">编辑说明</el-button>
        </dd>
      </dl>
      <!-- 7 -->
      <!-- <dl class="message" style="border-bottom: 0px;">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          审核通知
        </dd>
        <dd class="text">
          <span style="margin-left: 3px;"></span>
        </dd>
        <dd class="button">
          <el-button style="margin: auto;" type="success" size="mini" @click="noticeControl">{{buttonText}}</el-button>
        </dd>
      </dl> -->
    </el-card>
    <el-card class="box-card">
      <!-- 1 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          协会名称
        </dd>
        <dd class="text1">
          <input type="text" v-model="ccoicName" class="input_info">
        </dd>
      </dl>
      <!-- 2 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          微信号
        </dd>
        <dd class="text1">
          <input type="text" v-model="wechatId" class="input_info">
        </dd>
      </dl>
      <!-- 3 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          传真
        </dd>
        <dd class="text1">
          <input type="text" v-model="fax" class="input_info">
        </dd>
      </dl>
      <!-- 4 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          官方网址
        </dd>
        <dd class="text1">
          <input type="text" v-model="ccoicUrl" class="input_info">
        </dd>
      </dl>
      <!-- 5 -->
      <dl class="message">
        <dd class="name">
          <img src="../../../static/img/ccic.png" class="img" alt="img" style="vertical-align: middle;">
          注册时间
        </dd>
        <dd class="text1">
          <input type="text" v-model="userData.registerTime" class="input_info infoTime" disabled>
        </dd>
      </dl>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="changeData">修 改</el-button>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <!-- 修改电话 ↓-->
    <el-dialog
      title="修改电话"
      :visible.sync="dialogVisible1"
      width="90%"
      top="20vh">
      <el-input v-model="tel" placeholder="请输入新号码" class="change-input" clearable></el-input>
      <span style="display: inline-block; margin-bottom: 5px;">发送邮箱:{{userData.email}}</span>
      <el-button style="width: 100%;" class="change-input" @click="getMail()">获取邮箱验证码</el-button>
      <el-input v-model="telverify" placeholder="请输入验证码" class="change-input" clearable></el-input>
      <el-button style="width: 100%;" type="success" @click="changeTel()">确认修改</el-button>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible2"
      width="90%"
      top="20vh">
      <el-input
        type="password"
        v-model="oldPsw"
        placeholder="请输入旧密码"
        class="change-input"
        clearable
        onpaste="return false"
        oncontextmenu="return false"
        oncopy="return false"
        oncut="return false">
      </el-input>
      <el-input
        type="password"
        v-model="newPsw1"
        placeholder="请输入新密码"
        class="change-input"
        clearable
        onpaste="return false"
        oncontextmenu="return false"
        oncopy="return false"
        oncut="return false"
        @focus="testPw()">
      </el-input>
      <el-input
        type="password"
        v-model="newPsw2"
        placeholder="再次输入新密码"
        class="change-input"
        clearable
        onpaste="return false"
        oncontextmenu="return false"
        oncopy="return false"
        oncut="return false"
        @focus="testPw()">
        </el-input>
      <el-button style="width: 100%;" @click="changePW()" type="success" :disabled="test">确认修改</el-button>
    </el-dialog>
    <!-- 修改邮箱 -->
    <el-dialog
      title="修改邮箱"
      :visible.sync="dialogVisible3"
      width="90%"
      top="20vh">
      <span style="display: inline-block; margin-bottom: 5px;">旧邮箱：{{userData.email}}</span>
      <el-input v-model="newMail" placeholder="请输入新邮箱" class="change-input" clearable></el-input>
      <el-button style="width: 100%;" class="change-input" @click="getNewMail()">获取邮箱验证码</el-button>
      <el-input v-model="newMailVerify" placeholder="请输入验证码" class="change-input" clearable></el-input>
      <el-button style="width: 100%;" @click="changeMail()" type="success">确认修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      userData:{},
      fileName:"",
      buttonText:"开启通知",
      buttonType:false,
      // 修改1
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      // 修改电话
      telverify:"", // 验证码
      tel:"", // 电话
      // 修改密码
      oldPsw:"",
      newPsw1:"",
      newPsw2:"",
      test:false,
      // 修改邮箱
      newMail:"",
      newMailVerify:"",
      // 修改2
      ccoicName:"",
      ccoicUrl:"",
      fax:"",
      wechatId:""
    }
  },
  created(){
    this.getAllData()
    this.buttonType = true;
  },
  watch:{
    buttonType(val){
      if(val){
        this.buttonText = "关闭通知";
      }else{
        this.buttonText = "开启通知";
      };
    },
    immediate: true,
    deep:true
  },
  methods:{
    getAllData(){
      let OpenId = sessionStorage.getItem("OpenId");
      let getUser = axios.getUser(OpenId);
      getUser.then((res) => {
        if(res.data.msg == 'OK'){
          this.userData = res.data.data;
          if(!!this.userData.applyUrl){
            this.fileName = this.userData.applyUrl.split('images/')[1];
          };
          this.getInputData(res.data.data)
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    getInputData(data){
      this.ccoicName = data.ccoicName;
      this.ccoicUrl = data.ccoicUrl;
      this.fax = data.fax;
      this.wechatId = data.wechatId
    },
    // 修改电话
    getMail(){
      let em = this.userData.email
      let getEM = axios.getEM(em);
      getEM.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('验证码获取成功');
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    changeTel(){
      let OpenId = sessionStorage.getItem("OpenId");
      let tel = this.tel;
      let em = this.userData.email;
      let emVerify = this.telverify;
      if(!!emVerify && !!tel){
        let telChange = axios.telChange(OpenId,tel,em,emVerify)
        telChange.then((res) => {
          if(res.data.msg == 'OK'){
            this.$message.success('修改成功');
            this.getAllData();
            this.dialogVisible1 = false;
          }else{
            this.$message.error(res.data.msg);
          }
        });
      }else{
        this.$message.warning("输入不可为空");
      }
    },
    // 修改密码
    testPw(){
      if(this.oldPsw != this.userData.ccoicPwd){
        this.$message.warning("旧密码不正确");
        this.test = true;
      }else{
        this.test = false;
      }
    },
    changePW(){
      let OpenId = sessionStorage.getItem("OpenId");
      let oldPw = this.oldPsw;
      let newPw1 = this.newPsw1;
      let newPw2 = this.newPsw2;
      if(!!oldPw){
        if(!!newPw1){
          if(newPw1 == newPw2){
            let newPw = newPw2;
            let pwChange = axios.pwChange(OpenId,oldPw,newPw);
            pwChange.then((res) => {
                if(res.data.msg == 'OK'){
                  this.$message.success('修改成功');
                  this.getAllData();
                  this.dialogVisible2 = false;
                }else{
                  this.$message.error(res.data.msg);
                }
            })
          }else{
            this.$message.warning("两次密码不一致");
          }
        }else{
          this.$message.warning("新密码不能为空");
        }
      }else{
        this.$message.warning("旧密码不能为空");
      }
    },
    // 修改邮箱
    getNewMail(){
      if(!!this.newMail){
        let em = this.newMail;
        let getEM = axios.getEM(em);
        getEM.then((res) => {
          if(res.data.msg == 'OK'){
            this.$message.success('验证码获取成功');
          }else{
            this.$message.error(res.data.msg);
          }
        })
      }else{
        this.$message.warning("邮箱不能为空");
      }
    },
    changeMail(){
      let OpenId = sessionStorage.getItem("OpenId");
      let newEm = this.newMail;
      let code = this.newMailVerify;
      if(!!this.newMailVerify){
        let mailChange = axios.mailChange(OpenId,newEm,code);
        mailChange.then((res) => {
          if(res.data.msg == 'OK'){
            this.$message.success('修改成功');
            this.getAllData();
            this.dialogVisible3 = false;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      }else{
        this.$message.warning("验证码不能为空");
      }
    },
    // 编辑介绍
    go(){
      this.$router.push({
        path: '/myinfo',
        name: "myinfo",
        query:{
          introduction:this.userData.introduction
        }
      });
    },
    // 编辑协议
    goProtocol(){
      this.$router.push({
        path: '/protocol_edit',
        name: "protocol_edit",
        query:{
          introduction:this.userData.agreement
        }
      });
    },
    // 修改2
    changeData(){
      let OpenId = sessionStorage.getItem("OpenId");
      let Name = this.ccoicName;
      let Url = this.ccoicUrl;
      let Fax = this.fax;
      let Wechat = this.wechatId;
      let changeInFo = axios.changeInFo(OpenId,Name,Url,Fax,Wechat);
      changeInFo.then(res => {
        if(res.data.msg == 'OK'){
          this.$message.success('修改成功');
          this.getAllData();
        }else{
          this.$message.error(res.data.msg);
        }
      })
      
    },
    upDoc(){
      let File = this.$refs.upfile1.files[0];
      let fileName = this.$refs.upfile1.files[0].name;
      if(File.size <= 6000000){
        let addImg = axios.addImg(File,fileName);
        addImg.then((res) => {
          if(res.data.msg == 'OK'){
            this.fileName = this.$refs.upfile1.files[0].name;
            this.upProtocol(res.data.data);
          }else{
            this.$message.error(res.data.msg);
          }
        });
      }else{
        this.$message.error('文件大小不能超过5MB');
      }
    },
    upProtocol(data){
      let obj = {
        pkId: sessionStorage.getItem("id"),
        OpenId: sessionStorage.getItem("OpenId"),
        applyUrl: data
      }
      let upDoc = axios.upDoc(obj);
      upDoc.then(res => {
        if(res.data.msg == 'OK'){
         this.$message.success('上传成功');
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    noticeControl(){
      this.buttonType = !this.buttonType;
      if(!sessionStorage.getItem('appid')){
        axios.fWechatLogin('wxf422e749c5faa208','main/user').then(res => {
          
        });
      }
    }
  }
}
</script>

<style scoped>
dl{
  margin:0px;
  padding: 8px 0px;
  border-bottom: 1px solid #EEEEEE;
}
dd{
  margin: 0px;
}
.box-card{
  width: 97%;
  margin: 7px auto 0px;
}
.box-card:nth-of-type(2){
  margin-bottom: 7px;
}
.message{
  overflow: hidden;
}
.name,.text,.button,.text1{
  float: left;
}
.name{
  width: 28%;
  font-size: 13px;
  line-height: 28px;
  text-align: left;
}
.text{
  width: 47%;
  line-height: 18px;
  font-size: 13px;
  border-left: 1px solid #C1C1C1;
  margin: 5px 0px;
  text-align: left;
}
.button{
  width: 23%;
}
.img{
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.info{
  overflow: hidden;
  text-overflow: ellipsis;
}
.text1{
  width: 70%;
  font-size: 13px;
  border-left: 1px solid #C1C1C1;
  line-height: 18px;
  overflow: hidden;
  margin: 5px 0px;
}
.input_info{
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: 0px;
  box-sizing: border-box;
  color: #606266;
  font-size: inherit;
  height: 18px;
  line-height: 18px;
  outline: 0;
  padding: 0 15px;
  width: 90%;
  text-align: right
}
.change-input{
  margin-bottom: 10px;
}
.infoTime{
  color: black;
}
.mini-button{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: .1s;
  font-weight: 500;
  padding: 7px 9px;
  border-radius: 4px;
  font-size: 12px;
  border-radius: 3px;
  color: #FFF;
  background-color: #67C23A;
  border-color: #67C23A;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
}
#upfile1,#upfile2{
  display: none;
}
</style>
