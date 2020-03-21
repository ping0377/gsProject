<template>
  <div id="Payment">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 112px)">
        <el-table-column
          prop="levelName"
          label="名称"
          min-width="77"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="时间"
          min-width="95"
          align="center"
          fit="true"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="time_size">{{scope.row.createDate | data}} {{scope.row.createDate | time}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cost"
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
        <dd class="item xqfl2">{{levelName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">费用:</dd>
        <dd class="item xqfl2">{{cost}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">商家名称:</dd>
        <dd class="item xqfl2">{{gradeName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">时间:</dd>
        <dd class="item xqfl2">{{createDate}}</dd>
      </dl>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible2" width="90%" top="15vh">
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
      createDate:"",
      cost:"",
      levelName:"",
      tel:"",
      gradeName:"",
      // 查询
      dialogVisible2:false,
      S_stime:"",
      S_etime:"",
      S_gradeId:""
    }
  },
  created(){
    this.getAllData("","","");
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
    getAllData(s_stime,s_etime,s_grade){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let costSum = 0;
      let obj = {
        OpenId:OpenId,
        fkCcoicId:fkId,
        startDate:s_stime,
        endDate:s_etime,
        fkLevelId:s_grade
      }
      let getPayment = axios.getPayment(obj);
      getPayment.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            data[i].cost = parseFloat(data[i].cost).toFixed(2);
            data[i].createDate = this.formatDate(new Date(data[i].createDate));
            costSum += parseFloat(data[i].cost);
          }
          this.tableData = data;
          this.costSum = costSum.toFixed(2);
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getRank(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        fkCcoicId:fkId,
        OpenId:OpenId
      };
      let getShopRank = axios.getShopRank(obj);
      let rank = [];
      getShopRank.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            rank.push({value:data[i].pk_id,label:data[i].levelName});
          }
          this.options = rank;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getData(row){
      this.levelName = row.levelName;
      this.cost = row.cost;
      this.createDate = row.createDate;
      this.tel = row.updateTel;
      this.gradeName = row.updateName;
      this.dialogVisible1 = true;
    },
    searchData(){
      this.getAllData(this.S_stime,this.S_etime,this.S_gradeId);
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
