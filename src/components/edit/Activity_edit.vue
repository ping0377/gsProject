<template>
  <div>
    <el-header style="height: 42px;" class="header">
      <el-row>
        <el-col :span="2">
          <img src="../../../static/img/back.png" class="img" alt="img" @click="go('/main/activity')">
        </el-col>
        <el-col :span="20">编辑活动</el-col>
        <el-col :span="2">
          <img src="../../../static/img/home.png" class="img" alt="img" @click="go('/main/index')">
        </el-col>
      </el-row>
    </el-header>
    <el-main style="height: calc(100vh - 42px); padding: 0px;">
      <el-card class="box-card">
        <div class="edit_border">
          <div class="edit_img">
            <el-upload
              class="avatar-uploader upimg"
              action="#"
              :show-file-list="false"
              :limit="1"
              ref="upLoad1"
              :before-upload="beforeAvatarUpload"
              :http-request="changeImg">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="edit_text">
            <el-input style="margin-bottom: 5px;" type="text" placeholder="请输入标题" v-model="title"></el-input>
            <el-input type="textarea" :rows="2" placeholder="请输入描述" v-model="Description"></el-input>
          </div>
        </div>
        <div style="padding: 5px;">
          <el-row style="padding: 5px 0px;">
            <el-col :span="4" class="time">开始时间</el-col>
            <el-col :span="20" style="padding: 0px 5px;">
              <el-date-picker
                v-model="stTime"
                type="datetime"
                placeholder="请选择时间"
                style="width: 100%"
                :editable="false"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row style="padding: 5px 0px;">
            <el-col :span="4" class="time">结束时间</el-col>
            <el-col :span="20" style="padding: 0px 5px;">
              <el-date-picker
                v-model="edTime"
                type="datetime"
                placeholder="请选择时间"
                style="width: 100%"
                :editable="false"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <p class="text">活动报名金额</p>
              <el-input-number size="mini" :min="0" :max="99999999999999" v-model="Fee" style="width: 100%"></el-input-number>
            </el-col>
            <el-col :span="12">
              <p class="text">活动排序级别</p>
              <el-input-number size="mini" :min="0" :max="2147483647" v-model="Level" style="width: 100%"></el-input-number>
            </el-col>
          </el-row>
        </div>
        <el-button style="width: 100%; padding: 7px 0px;" type="success" @click="Edit()">完成编辑</el-button>
      </el-card>
      <el-card class="box-card">
        <div v-html="text" ref="infor" class="info ql-editor view_edit" style="padding: 0px;"></div>
        <el-button style="width: 100%; padding: 7px 0px;" type="primary" @click="goEdit()">编辑详细信息</el-button>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      id:"",
      title:'', //活动标题
      Description:'',
      imageUrl:'',
      Level:0, //活动显示排序级别
      Fee:0, //活动报名金额
      stTime:"", //开始时间
      edTime:"", //结束时间
      text:""
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.id = this.$route.query.id;
        this.text = this.$route.query.text;
        this.getData(this.$route.query.id);
      },
      immediate: true
    }
  },
  created(){
    this.out();
    if(!this.id){
      this.$router.push({path: '/main/activity'})
    }
  },
  methods: {
    out(){
      let OpenId = sessionStorage.getItem("OpenId");
      let getUser = axios.getUser(OpenId);
      getUser.then((res) => {
        if(res.data.msg != 'OK'){
          this.$message.error(res.data.msg);
          this.$router.push({path: '/login'});
          sessionStorage.removeItem("OpenId");
          sessionStorage.removeItem("id");
        }
      })
    },
    getData(id){
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let ID = id;
      let title = "";
      let getActivity = axios.getActivity(OpenId,fkId,ID,title);
      getActivity.then((res) => {
        if(res.data.msg == 'OK'){
          this.getEditData(res.data.data);
          this.getTime(res.data.data);
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    formatDate(now) { 
      let year=now.getFullYear();
      let month=now.getMonth()+1;
      let date=now.getDate();
      let hour=now.getHours();
      let minute=now.getMinutes();
      let second=now.getSeconds();
      if(month<10){
        month = '0' + month;
      };
      if(date<10){
        date = '0' + date;
      };
      if(hour<10){
        hour = '0' + hour;
      };
      if(minute<10){
        minute = '0' + minute;
      };
      if(second<10){
        second = '0' + second;
      };
      return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    },
    getTime(data){
      let stTime = new Date(data[0].startDate);
      let edTime = new Date(data[0].endDate);
      this.stTime = this.formatDate(stTime);
      this.edTime = this.formatDate(edTime);
    },
    getEditData(data){
      this.imageUrl = data[0].activityPhotos;
      this.title = data[0].title;
      this.Description = data[0].activityDescription;
      this.Level = data[0].sortingLevel;
      this.Fee = data[0].entryFee;
    },
    go(url){
      this.$router.push({path: url});
    },
    // 编辑
    changeImg(file){
      let File = file.file;
      let addImgs = axios.addImgs(File);
      addImgs.then((res) => {
        if(res.data.msg == 'OK'){
          this.imageUrl = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    Edit(){
      let OpenId = sessionStorage.getItem("OpenId");
      if(!this.Fee){
        this.Fee = 0
      }
      if(!this.Level){
        this.Level = 0
      }
      let obj = {
        OpenId:OpenId,
        pkId:this.id,
        title:this.title,
        sortingLevel:this.Level,
        entryFee:this.Fee,
        activityDescription:this.Description,
        startDate:this.stTime,
        endDate:this.edTime,
        activityPhotos:this.imageUrl
      }
      let activityEdit = axios.activityEdit(obj);
      activityEdit.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('编辑成功');
          this.$refs.upLoad1.clearFiles();
          this.getData(this.id);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    goEdit(){
      this.$router.push({
        path: '/activityinfoedit',
        name: "activityinfoedit",
        query:{
          id:this.id,
          text:this.text
        }
      });
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
.upimg{
  width: 92px;
  height: 92px;
  line-height: 92px;
  border: 1px solid #C4C4C4;
  border-radius: 5px;
  margin: 5px;
}
.upimg img{
  width: 100%;
  height: 100%;
}
.img{
  width: 22px;
  height: 22px;
}
.box-card{
  width: 96%;
  margin: 5px auto;
}
.edit_border{
  overflow: hidden;
}
.edit_img,.edit_text{
  float: left;
}
.edit_text{
  width: calc(100% - 115px);
  margin: 5px;
}
.view_edit{
  height: calc(100vh - 373px);
  overflow-y: scroll;
}
.text{
  margin: 0px;
  font-size: 14px;
  margin-bottom: 5px;
  color: #C2C2C2;
}
.time{
  color: #C2C2C2;
  font-size: 12px;
  line-height: 33px;
}
</style>
