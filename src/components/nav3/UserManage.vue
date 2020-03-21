<template>
  <div id="UserManage">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 85px)">
        <el-table-column
          prop="userName"
          label="名称"
          min-width="70"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="grade"
          label="级别"
          min-width="88"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          min-width="85"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="65" align="center" fit="true">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              trigger="click">
              <div>
                <el-button type="text" size="small" @click="getData(scope.row)" style="padding: 0px; font-size:12px">详情</el-button>
                <el-button type="text" size="small" @click="upData(scope.row)" style="padding: 7px 0px; font-size:12px">升级</el-button>
              </div>
              <el-button type="text" slot="reference" style="padding: 7px 0px; font-size:12px">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible3 = true">查 询</el-button>
      </div>
    </el-card>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">用户名:</dd>
        <dd class="item xqfl2">{{userName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">性别:</dd>
        <dd class="item xqfl2">{{sex}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">级别:</dd>
        <dd class="item xqfl2">{{gradeId}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">邮箱:</dd>
        <dd class="item xqfl2">{{email}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">注册时间:</dd>
        <dd class="item xqfl2">{{registerTime}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">生日:</dd>
        <dd class="item xqfl2">{{birthday}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">地区:</dd>
        <dd class="item xqfl2">{{userSite}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1" :class="blacklist==true?'hide':''">
          <el-button type="danger" size="small" @click="addBlackList(true)">加入黑名单</el-button>
        </dd>
        <dd class="item1" :class="blacklist==true?'':'hide'">
          <el-button type="success" size="small" @click="addBlackList(false)">解除黑名单</el-button>
        </dd>
      </dl>
    </el-dialog>
    <!-- 升级弹窗 -->
    <el-dialog title="升级" :visible.sync="dialogVisible2" width="90%" top="20vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">用户名:</dd>
        <dd class="item xqfl2">{{upName}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
           <el-select v-model="upGradeId" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">金额:</dd>
        <dd class="item">
          <el-input type="number" v-model="upCost" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upRank()">升 级</el-button>
      </span>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible3" fullscreen>
      <dl class="text">
        <dd class="item1">用户名:</dd>
        <dd class="item">
          <el-input v-model="S_name" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="S_gradeId" placeholder="请选择" style="width: 100%">
            <el-option label="全部级别" value=""></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input v-model="S_tel" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">是否在黑名单内</dd>
        <dd class="item">
          <el-select v-model="S_black" placeholder="请选择" style="width: 100%">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">注册开始时间:</dd>
        <dd class="item">
          <el-date-picker
            v-model="S_stime"
            type="datetime"
            placeholder="请选择时间"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
            :editable="false">
          </el-date-picker>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">注册结束时间:</dd>
        <dd class="item">
          <el-date-picker
            v-model="S_etime"
            type="datetime"
            placeholder="请选择时间"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
            :editable="false"
            default-time="23:59:59">
          </el-date-picker>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      tableData:[],
      options:[],
      // 详情
      dialogVisible1:false,
      birthday:"",
      chatHead:"",
      email:"",
      gradeId:"",
      registerTime:"",
      sex:"",
      tel:"",
      userName:"",
      userSite:"",
      blacklist:false,
      // 升级
      dialogVisible2:false,
      upName:"",
      upGradeId:"",
      upCost:"",
      userId:"",
      // 查询
      dialogVisible3:false,
      S_name:"",
      S_tel:"",
      S_gradeId:"",
      S_stime:"",
      S_etime:"",
      S_black:""
    }
  },
  created(){
    this.getAllData();
    this.getRank();
  },
  methods:{
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
    formatBirthday(now) {
      let year=now.getFullYear(); 
      let month=now.getMonth()+1; 
      let date=now.getDate(); 
      return year+"-"+month+"-"+date;
    },
    getAllData(s_name,s_tel,s_stime,s_etime,s_grade,s_black){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkId,
        userName:s_name,
        userTel:s_tel,
        startTime:s_stime,
        endTime:s_etime,
        grade:s_grade,
        isBlacklist:s_black
      }
      let getUserManage = axios.getUserManage(obj);
      getUserManage.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            if(data[i].sex == 0){
              data[i].sex = '男';
            }else{
              data[i].sex = '女'
            }
            let time = this.formatDate(new Date(data[i].registerTime));
            data[i].registerTime = time;
            let birthday = this.formatBirthday(new Date(data[i].birthday));
            data[i].birthday = birthday;
          }
          this.tableData = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getRank(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let getGradeAll = axios.getGradeAll(OpenId,fkId);
      let data = [];
      getGradeAll.then((res) => {
        if(res.data.msg == 'OK'){
          for(let i=0;i<res.data.data.length;i++){
            data.push({label:res.data.data[i].gradeName,value:res.data.data[i].pkId});
          }
          this.options = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getData(row){
      this.birthday = row.birthday;
      this.chatHead = row.chatHead;
      this.email = row.email;
      this.gradeId = row.grade;
      this.registerTime = row.registerTime;
      this.sex = row.sex;
      this.tel = row.tel;
      this.userName = row.userName;
      this.userSite = row.userSite;
      this.userId = row.userId;
      this.blacklist = row.isBlacklist
      this.dialogVisible1 = true;
    },
    upData(row){
      if(row.isBlacklist){
        this.$message.error('此用户在黑名单内，无法升级');
      }else{
        this.upName = row.userName;
        this.userId = row.userId;
        for(let i=0;i<this.options.length;i++){
          if(this.options[i].value == row.fk_gradeId){
            this.upGradeId = this.options[i].value;
          }
        }
        this.dialogVisible2 = true;
      };
    },
    upRank(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let cost;
      if(parseFloat(this.upCost)){
        cost = parseFloat(this.upCost);
      }else{
        cost = 0;
      }
      let obj = {
        OpenId:OpenId,
        userId:this.userId,
        gradeId:this.upGradeId,
        ccoicId:fkId,
        cost:cost,
      }
      let upUserManage = axios.upUserManage(obj);
      upUserManage.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('升级成功');
          this.dialogVisible2 = false;
          this.upCost = "",
          this.getAllData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    searchData(){
      let name = this.S_name;
      let tel = this.S_tel;
      let stime = this.S_stime;
      let etime = this.S_etime;
      let grade = this.S_gradeId;
      let black = this.S_black;
      this.getAllData(name,tel,stime,etime,grade,black);
      this.dialogVisible3 = false;
    },
    addBlackList(type){
      let obj = {
        OpenId: sessionStorage.getItem("OpenId"),
        fkCcoicId: sessionStorage.getItem("id"),
        isBlacklist: type,
        userId: this.userId
      };
      let addBlackList = axios.addBlackList(obj);
      addBlackList.then(res => {
        if(res.data.msg == 'OK'){
          if(type == true){
            this.$message.success('加入黑名单成功');
          }else{
            this.$message.success('解除黑名单成功');
          };
          this.dialogVisible1 = false;
          this.getAllData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
dd{
  margin: 0px;
}
.box-card {
  width: 96%;
  margin: 0px auto;
  margin-top: 5px;
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
.xqfl{
  overflow: hidden;
}
.xqfl1{
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2{
  float: left;
  line-height: 19px;
}
.hide{
  display: none;
}
</style>
