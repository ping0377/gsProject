<template>
  <div id="VipRecord">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 84px)">
        <el-table-column
          prop="cardNumber"
          label="卡号"
          min-width="78"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
          min-width="80"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          min-width="80"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="70" align="center" fit="true">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              trigger="click">
              <div>
                <el-button type="text" size="mini" @click="go(scope.row)">交易记录</el-button>
                <el-button type="text" size="mini" @click="getData(scope.row)">详情</el-button>
              </div>
              <el-button type="text" size="mini" slot="reference">操作</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible2 = true">查 询</el-button>
      </div>
    </el-card>
     <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible1" width="90%" top="25vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">用户名:</dd>
        <dd class="item xqfl2">{{userName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">卡号:</dd>
        <dd class="item xqfl2">{{cardNumber}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">余额:</dd>
        <dd class="item xqfl2">{{balance}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">手机号:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">时间:</dd>
        <dd class="item xqfl2">{{createTime}}</dd>
      </dl>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">卡号:</dd>
        <dd class="item">
          <el-input v-model="S_num" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">姓名:</dd>
        <dd class="item">
          <el-input v-model="S_name" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">电话:</dd>
        <dd class="item">
          <el-input v-model="S_tel" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">余额最大值:</dd>
        <dd class="item">
          <el-input v-model="min_cash" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">余额最小值:</dd>
        <dd class="item">
          <el-input v-model="max_cash" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">开始时间:</dd>
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
        <dd class="item1">结束时间:</dd>
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
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return {
      tableData:[],
      // 详情
      dialogVisible1:false,
      userName:"", // 用户名
      cardNumber:"", // 卡号
      balance:"", // 余额
      createTime:"", // 时间
      tel:"", // 手机号
      // 查询
      dialogVisible2:false,
      S_num:"",
      S_tel:"",
      S_name:"",
      min_cash:"",
      max_cash:"",
      S_stime:"",
      S_etime:""
    }
  },
  created(){
    this.getAllData();
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
    getAllData(name,tel,num,minCash,maxCash,sdata,edata){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkId,
        userName:name,
        userTel:tel,
        cardNumber:num,
        ltMoney:minCash,
        gtMoney:maxCash,
        startDate:sdata,
        endDate:edata
      }
      let getUserCard = axios.getUserCard(obj);
      getUserCard.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            let time = this.formatDate(new Date(data[i].createTime));
            data[i].createTime = time;
          }
          this.tableData = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    go(row){
      this.$vipId.vipId = row.userId;
      this.$router.push({path:'/record'});
    },
    getData(row){
      this.userName = row.userName;
      this.cardNumber = row.cardNumber;
      this.balance = row.balance;
      this.createTime = row.createTime;
      this.tel = row.tel;
      this.dialogVisible1 = true;
    },
    searchData(){
      let maxCash;
      let minCash;
      if(parseFloat(this.max_cash)){
        maxCash = parseFloat(this.max_cash);
      }else{
        maxCash = "";
      }
      if(parseFloat(this.min_cash)){
        minCash = parseFloat(this.min_cash);
      }else{
        minCash = "";
      }
      this.getAllData(this.S_name,this.S_tel,this.S_num,minCash,maxCash,this.S_stime,this.S_etime);
      this.dialogVisible2 = false;
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 96%;
  margin: 5px auto;
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
</style>
