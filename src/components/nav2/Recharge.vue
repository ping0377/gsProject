<template>
  <div id="Payment">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 112px)">
        <el-table-column
          prop="cardNumber"
          label="卡号"
          min-width="70"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="充值时间"
          min-width="84"
          align="center"
          fit="true"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="time_size">{{scope.row.depositTime | data}} {{scope.row.depositTime | time}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="depositbalance"
          label="充值金额"
          min-width="80"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="73" align="center" fit="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="getData(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sum">充值总额：<span>{{costSum}}</span>元</div>
      <div style="width: 100%; display:flex;">
        <div style="width:50%; border-right: 1px solid #EAEDF4;">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible2 = true">查 询</el-button>
        </div>
        <div style="width:calc(50% - 1px)">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="getAllData()">刷 新</el-button>
        </div>
      </div>
    </el-card>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible1" width="90%" top="20vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">卡号:</dd>
        <dd class="item xqfl2">{{cardNumber}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">用户名:</dd>
        <dd class="item xqfl2">{{userName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">充值金额:</dd>
        <dd class="item xqfl2">{{depositbalance}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">充值时间:</dd>
        <dd class="item xqfl2">{{depositTime}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">余额:</dd>
        <dd class="item xqfl2">{{balance}}</dd>
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
    return{
      tableData:[],
      options:[],
      costSum:0,
      // 详情
      dialogVisible1:false,
      cardNumber:"",
      depositbalance:"",
      depositTime:"",
      userName:"",
      tel:"",
      balance:"",
      // 查询
      dialogVisible2:false,
      S_num:"",
      S_tel:"",
      S_name:"",
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
    getAllData(name,tel,num,sdata,edata){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let costSum = 0;
      let obj = {
        OpenId:OpenId,
        ccoicId:fkId,
        userName:name,
        userTel:tel,
        cardNumber:num,
        startDate:sdata,
        endDate:edata
      }
      let rechargeMsg = axios.rechargeMsg(obj);
      rechargeMsg.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            costSum += parseFloat(data[i].depositbalance);
            let time = this.formatDate(new Date(data[i].depositTime));
            data[i].depositTime = time;
          }
          this.tableData = data;
          this.costSum = costSum.toFixed(2);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getData(row){
      this.userName = row.userName;
      this.tel = row.tel;
      this.cardNumber = row.cardNumber;
      this.depositbalance = row.depositbalance;
      this.depositTime = row.depositTime;
      this.balance = row.balance;
      this.dialogVisible1 = true;
    },
    searchData(){
      this.getAllData(this.S_name,this.S_tel,this.S_num,this.S_stime,this.S_etime);
      this.dialogVisible2 = false;
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
  height: 19px;
  line-height: 19px;
  margin-bottom: 5px;
}
.sum{
  font-size: 13px;
  color: #94979C;
  font-weight: bold;
  padding: 5px 0px;
  border-bottom: 1px solid #EAEDF4;
}
.sum span{
  color: red;
}
</style>
