<template>
  <div id="Actpayment">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 112px)">
        <el-table-column
          prop="activityName"
          label="活动名称"
          min-width="82"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="90"
          align="center"
          fit="true"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="time_size">{{scope.row.attendDate | data}} {{scope.row.attendDate | time}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="entryFee"
          label="费用"
          min-width="70"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="65" align="center" fit="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="getData(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sum">缴费总额：<span>{{costSum}}</span>元</div>
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
    <el-dialog title="详情" :visible.sync="dialogVisible1" width="90%" top="25vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">用户名:</dd>
        <dd class="item xqfl2">{{name}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">活动名称:</dd>
        <dd class="item xqfl2">{{actname}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">活动时间:</dd>
        <dd class="item xqfl2">{{time}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">缴纳费用:</dd>
        <dd class="item xqfl2">{{cost}}元</dd>
      </dl>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible2" width="90%" top="15vh">
      <dl class="text">
        <dd class="item1">活动名称:</dd>
        <dd class="item">
          <el-input v-model="S_actname" clearable autocomplete="off"></el-input>
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
        <el-button @click="empty()">清 空</el-button>
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
      costSum:0,
      dialogVisible1:false,
      actname:"",
      name:"",
      time:"",
      tel:"",
      cost:0,
      dialogVisible2:false,
      S_actname:"",
      S_stime:"",
      S_etime:""
    }
  },
  created(){
    this.getAllData()
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
    getAllData(s_actname,s_stime,s_etime){
      let obj = {
        OpenId:sessionStorage.getItem('OpenId'),
        associationId:sessionStorage.getItem('id'),
        startDate:s_stime,
        endDate:s_etime,
        ActivityName:s_actname
      };
      let costSum = 0;
      let getActPayment = axios.getActPayment(obj);
      getActPayment.then(res => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            data[i].attendDate = this.formatDate(new Date(data[i].attendDate));
            data[i].entryFee = parseFloat(data[i].entryFee).toFixed(2);
            costSum += parseFloat(data[i].entryFee);
          };
          this.tableData = data;
          this.costSum = costSum.toFixed(2);
        }else{
          this.$message.error(res.data.msg);
        };
      });
    },
    getData(row){
      this.time = row.attendDate;
      this.actname = row.activityName;
      this.name = row.participantName;
      this.cost = row.entryFee;
      this.tel = row.participantTel;
      this.dialogVisible1 = true;
    },
    searchData(){
      this.getAllData(this.S_actname,this.S_stime,this.S_etime);
      this.dialogVisible2 = false;
    },
    empty(){
      this.S_actname = "";
      this.S_stime = "";
      this.S_etime = "";
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