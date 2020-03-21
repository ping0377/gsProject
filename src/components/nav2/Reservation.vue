<template>
  <div id="Reservation">
    <el-card class="box-card">
      <el-tabs
        type="card"
        v-model="activeName"
        @tab-click="handleClick"
        style="height: calc(100vh - 85px);">
        <el-tab-pane label="待接单" name="0001">
          <div class="showText">
            <div v-for="(item,index) in data" :key="index">
              <div class="box" @click="review(item)">
                <div class="img-box">
                  <img src="../../../static/img/ccic.png" class="img" alt="img">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12" class="hover">{{item.resTel}}</el-col>
                    <el-col :span="12" class="time">{{item.resDate | data}} {{item.resDate | time}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15" class="address">{{item.userSite}}</el-col>
                  </el-row>
                </div>
                <div class="icon-box">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待收取" name="0002">
          <div class="showText">
            <div v-for="(item,index) in data" :key="index">
              <div class="box" @click="review(item)">
                <div class="img-box">
                  <img src="../../../static/img/ccic.png" class="img" alt="img">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12" class="hover">{{item.resTel}}</el-col>
                    <el-col :span="12" class="time">{{item.resDate | data}} {{item.resDate | time}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15" class="address">{{item.userSite}}</el-col>
                  </el-row>
                </div>
                <div class="icon-box">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待配送" name="0003">
          <div class="showText">
            <div v-for="(item,index) in data" :key="index">
              <div class="box" @click="review(item)">
                <div class="img-box">
                  <img src="../../../static/img/ccic.png" class="img" alt="img">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12" class="hover">{{item.resTel}}</el-col>
                    <el-col :span="12" class="time">{{item.resDate | data}} {{item.resDate | time}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15" class="address">{{item.userSite}}</el-col>
                  </el-row>
                </div>
                <div class="icon-box">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="0004">
          <div class="showText">
            <div v-for="(item,index) in data" :key="index">
              <div class="box" @click="review(item)">
                <div class="img-box">
                  <img src="../../../static/img/ccic.png" class="img" alt="img">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12" class="hover">{{item.resTel}}</el-col>
                    <el-col :span="12" class="time">{{item.resDate | data}} {{item.resDate | time}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15" class="address">{{item.userSite}}</el-col>
                  </el-row>
                </div>
                <div class="icon-box">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="width: 100%; display:flex; border-top: 1px solid #EAEDF4;">
        <div style="width:50%; border-right: 1px solid #EAEDF4;">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible2 = true">查 询</el-button>
        </div>
        <div style="width:calc(50% - 1px)">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="getAllData()">刷 新</el-button>
        </div>
      </div>
    </el-card>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible1" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">下单时间:</dd>
        <dd class="item xqfl2">{{resDate}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">下单电话:</dd>
        <dd class="item xqfl2">{{resTel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">下单姓名:</dd>
        <dd class="item xqfl2">{{resName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">下单地址:</dd>
        <dd class="item xqfl2">{{userSite}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">配送费:</dd>
        <dd class="item xqfl2">{{shippingFee}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">上门时间:</dd>
        <dd class="item xqfl2">{{visitDate}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">件数:</dd>
        <dd class="item xqfl2">{{numbers}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">备注:</dd>
        <dd class="item xqfl2">{{remarks}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">下单店铺:</dd>
        <dd class="item xqfl2">{{shopName}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">店铺地址:</dd>
        <dd class="item xqfl2">{{shopSite}}</dd>
      </dl>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible2" width="90%" top="20vh">
      <dl class="text">
        <dd class="item1">下单开始时间:</dd>
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
        <dd class="item1">下单结束时间:</dd>
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
      data:[],
      activeName:"0001",
      stateNo:"0001",
      // 详情
      dialogVisible1:false,
      userSite:"", // 下单地址
      shopSite:"", // 店铺地址
      shopName:"", // 店铺名称
      numbers:"", // 件数
      remarks:"", // 备注
      resDate:"", // 下单时间
      resName:"", // 下单姓名
      resTel:"", // 下单电话
      shippingFee:"", // 配送费
      visitDate:"", // 上门时间
      tel:"", // 店铺电话
      // 查询
      S_stime:"",
      S_etime:"",
      dialogVisible2:false
    }
  },
  created(){
    this.getAllData(this.stateNo);
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
    getAllData(No,stime,etime){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkId,
        state:No,
        startDate:stime,
        endDate:etime
      }
      let reserveOrder = axios.reserveOrder(obj);
      reserveOrder.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data
          for(let i=0;i<data.length;i++){
            let resDate = this.formatDate(new Date(data[i].resDate));
            let visitDate = this.formatDate(new Date(data[i].visitDate));
            data[i].resDate = resDate;
            data[i].visitDate = visitDate;
          }
          this.data = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 详情
    review(data){
      this.userSite = data.userSite;
      this.shopName = data.shopName;
      this.shopSite = data.shopSite;
      this.remarks = data.remarks;
      this.resDate = data.resDate;
      this.resName = data.resName;
      this.resTel = data.resTel;
      this.numbers = data.numbers;
      this.shippingFee = data.shippingFee;
      this.visitDate = data.visitDate;
      this.tel = data.tel;
      this.dialogVisible1 = true;
    },
    // 查询
    searchData(){    
      this.getAllData(this.stateNo,this.S_stime,this.S_etime);
      this.dialogVisible2 = false;
    },
    handleClick(tab) {
      this.stateNo = tab.name;
      this.getAllData(tab.name);
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 96%;
  margin: 0px auto;
  margin-top: 5px;
}
dd{
  margin: 0px;
}
.showText {
  max-height: calc(100vh - 125px);
  overflow-y: scroll;
}
.box{
  overflow: hidden;
  padding: 5px 0px;
  border-bottom: 1px solid #EBEEF5;
}
.img-box,.text-box,.icon-box{
  float: left;
}
.img-box{
  height: 40px;
}
.text-box{
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  width: calc(100vw - 80px);
}
.icon-box{
  line-height: 40px;
  width: 20px;
}
.img{
  width: 30px;
  height: 30px;
  margin: 5px;
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
.time{
  font-size: 12px;
  text-align: right;
  padding-right: 5px;
}
.address{
  font-size: 11px;
  color: #8E8E8E;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
