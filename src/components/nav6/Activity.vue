<template>
  <div id="Activity">
    <el-card class="box-card">
      <el-row>
        <el-col :span="18">
          <input type="text" v-model="searchName" placeholder="请输入标题" class="search">
        </el-col>
        <el-col :span="6">
          <div style="width: 100%;">
            <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="searchShop">查 询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-collapse accordion class="showText">
        <el-collapse-item v-for="(item,index) in activity" :key="index">
          <template slot="title">
            <img :src="item.activityPhotos" class="img" alt="img" @error="defImg">
            {{item.title}}
          </template>
          <div>
            <el-row>
              <el-col :span="15" style="text-align: left; padding-left: 10px; line-height: 28px;">活动描述</el-col>
              <el-col :span="9">
                <el-button size="mini" type="primary" @click="go(item)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
              </el-col>
            </el-row>
          </div>
          <div style="text-align: left; padding-left: 10px;">{{item.activityDescription}}</div>
        </el-collapse-item>
      </el-collapse>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible1 = true">添 加</el-button>
      </div>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogVisible1" fullscreen>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <dl class="text">
          <dd class="item1">活动标题:</dd>
          <dd class="item">
            <el-form-item prop="title">
              <el-input v-model="ruleForm.title" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">活动报名金额:</dd>
          <dd class="item">
            <el-form-item prop="fee">
              <el-input v-model="ruleForm.fee" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">活动显示排序级别:</dd>
          <dd class="item">
            <el-form-item prop="level">
              <el-input v-model="ruleForm.level" clearable></el-input>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">开始时间</dd>
          <dd class="item">
            <el-form-item prop="stDate">
              <el-date-picker v-model="ruleForm.stDate" type="datetime" placeholder="请选择时间" style="width: 100%" :editable="false" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">结束时间</dd>
          <dd class="item">
            <el-form-item prop="edDate">
              <el-date-picker v-model="ruleForm.edDate" type="datetime" placeholder="请选择时间" style="width: 100%" :editable="false" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59"></el-date-picker>
            </el-form-item>
          </dd>
        </dl>
        <dl class="text">
          <dd class="item1">活动描述:</dd>
          <dd class="item">
            <el-form-item prop="description">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="ruleForm.description"></el-input>
            </el-form-item>
          </dd>
        </dl>
      </el-form>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="upImg"
            list-type="picture"
            accept = ".jpeg, .png, .gif, .jpg"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            ref="upLoad2">
            <span style="text-align: left;">图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addData('ruleForm')">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogVisible2" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd>名称:</dd>
        <dd>{{delName}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd>描述:</dd>
        <dd>{{delText}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delData">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    var checkLevel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('活动排序级别不能为空'));
      }else if(!/^[0-9]+$/.test(value)){
        callback(new Error('必须为数字'));
      }else{
        callback();
      }
    };
    var checkFee = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('活动报名金额不能为空'));
      }else if(!/^[0-9]+(\.\d{2})?$/.test(value)){
        callback(new Error('必须为数字,格式为10或10.00'));
      }else{
        callback();
      }
    };
    return{
      activity:[],
      // 查询
      searchName:"",
      // 添加
      dialogVisible1: false,
      ruleForm: {
        title:"", //活动标题
        level:"", //活动显示排序级别
        fee:"", //活动报名金额
        description:"", //活动描述
        stDate:"", //开始时间
        edDate:"" //结束时间
      },
      imageUrl:"",
      rules: {
        title: [
          { required: true, message: '活动标题不能为空', trigger: 'blur' },
        ],
        stDate: [
          { required: true, message: '开始时间不能为空', trigger: 'change' }
        ],
        edDate: [
          { required: true, message: '结束时间不能为空', trigger: 'change' }
        ],
        description: [
          { required: true, message: '活动描述不能为空', trigger: 'blur' },
        ],
        fee: [
          { validator: checkFee, trigger: 'blur' }
        ],
        level: [
          { validator: checkLevel, trigger: 'blur' }
        ]
      },
      // 删除
      dialogVisible2: false,
      delName:"",
      delText:"",
      del_ID:""
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(tip){
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let id = "";
      let title = tip;
      let zhanwei = './static/img/ccic.png';
      let getActivity = axios.getActivity(OpenId,fkId,id,title);
      getActivity.then((res) => {
        if(res.data.msg == 'OK'){
          let activity = res.data.data;
          for(var i=0;i<activity.length;i++){
            if(!activity[i].activityPhotos){
              activity[i].activityPhotos = zhanwei;
            }
          }
          this.activity = activity;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    defImg(){
      event.target.src = "./static/img/ccic.png";
    },
    searchShop(){
      this.getData(this.searchName);
    },
    // 编辑
    go(data){
      let id = data.pk_id;
      let text = data.bodyText
      this.$router.push({
        path: '/activityedit',
        name: "activityedit",
        query:{
          id:id,
          text:text
        }
      });
    },
    // 添加
    upImg(file){
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then((res) => {
        if(res.data.msg == 'OK'){
          this.imageUrl = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    addData(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid) {
          let OpenId = sessionStorage.getItem("OpenId");
          let id = sessionStorage.getItem("id");
          let obj = {
            OpenId:OpenId,
            fkCcoicId:id,
            title:this.ruleForm.title,
            activityDescription:this.ruleForm.description,
            sortingLevel:this.ruleForm.level,
            entryFee:this.ruleForm.fee,
            startDate:this.ruleForm.stDate,
            endDate:this.ruleForm.edDate,
            bodyText:"<p>活动内容</p>",
            activityPhotos:this.imageUrl
          }
          let addActivity = axios.addActivity(obj);
          addActivity.then((res) => {
            if(res.data.msg == 'OK'){
              this.$message.success('添加成功');
              this.$refs.upLoad2.clearFiles();
              this.getData();
              this.dialogVisible1 = false;
            }else{
              this.$message.error(res.data.msg);
            }
          });
        }
      })
    },
    // 删除
    del(data){
      this.delText = data.activityDescription;
      this.delName = data.title;
      this.del_ID = data.pk_id;
      this.dialogVisible2 = true;
    },
    delData(){
      let OpenId = sessionStorage.getItem("OpenId");
      let id = this.del_ID;
      let delActivity = axios.delActivity(OpenId,id);
      delActivity.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('删除成功');
          this.getData();
          this.dialogVisible2 = false;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 96%;
  margin: 5px auto;
}
.search{
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: 0px;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
  width: 90%;
  text-align: left
}
.showText {
  height: calc(100vh - 118px);
  overflow-y: scroll;
}
.img {
  width: 22px;
  height: 22px;
  margin-left: 5px;
  margin-right: 5px;
}
dd{
  margin: 0px;
}
.text{
  margin-top: 5px;
  margin-bottom: 5px;
}
.item{
  text-align: left;
}
.item1{
  text-align: left;
  margin-bottom: 5px;
}
</style>
