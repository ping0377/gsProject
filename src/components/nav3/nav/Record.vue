<template>
  <div id="Record">
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="充值记录" name="first">
          <div class="show">
            <div v-for="(item,index) in recharge" :key="index">
              <div class="box-border">
                <div class="img-box">
                  <img src="../../../../static/img/cardcz.png" alt="img" class="img1">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12">
                      <div class="msg Recordleft Recordnum">卡号:{{item.cardNumber}}</div>
                      <div class="msg Recordleft Recordtime">{{item.depositTime}}</div>
                      <div></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="msg Recordright Recordmoney">+{{item.depositbalance}}</div>
                      <div class="msg Recordright Recordcash">余额:{{item.balance}}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="second">
          <div class="show">
            <div v-for="(item,index) in consume" :key="index">
              <div class="box-border">
                <div class="img-box">
                  <img src="../../../../static/img/cardkk.png" alt="img" class="img1">
                </div>
                <div class="text-box">
                  <el-row>
                    <el-col :span="12">
                      <div class="msg Recordleft Recordnum">卡号:{{item.cardNumber}}</div>
                      <div class="msg Recordleft Recordtime">{{item.paymentDate}}</div>
                      <div></div>
                    </el-col>
                    <el-col :span="12">
                      <div class="msg Recordright Recordmoney">-{{item.payment}}</div>
                      <div class="msg Recordright Recordcash">余额:{{item.balance}}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div>
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="go()">返 回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      activeName: 'first',
      recharge:[],
      consume:[]
    }
  },
  created(){
    if(!!this.$vipId.vipId){
      this.getRecharge(this.$vipId.vipId);
      this.getConsume(this.$vipId.vipId);
    }else{
      this.$router.push({path:'/main/viprecord'});
    }
  },
  methods:{
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
    getRecharge(userId){
      let OpenId = sessionStorage.getItem("OpenId");
      let fkid = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkid,
        userId:userId
      }
      let rechargeMsg = axios.rechargeMsg(obj);
      rechargeMsg.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            let time = this.formatDate(new Date(data[i].depositTime));
            data[i].depositTime = time;
          }
          this.recharge = data
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getConsume(userId){
      let OpenId = sessionStorage.getItem("OpenId");
      let fkid = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkid,
        userId:userId
      }
      let cardConsume = axios.cardConsume(obj);
      cardConsume.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            let time = this.formatDate(new Date(data[i].paymentDate));
            data[i].paymentDate = time;
          }
          this.consume = data
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    go(){
      this.$router.push({path:'/main/viprecord'});
    }
  }
}
</script>

<style scope>
.show{
  height: calc(100vh - 81px);
  overflow-y: scroll;
}
.box-card{
  width: 96%;
  margin: 5px auto;
}
.box-border{
  padding: 5px;
  border-bottom: 1px solid #EAEDF4;
  overflow: hidden;
}
.msg{
  height: 20px;
  line-height: 20px;
}
.Recordleft{
  text-align: left
}
.Recordtime{
  font-size: 10px;
  color: #8E8E8E;
}
.Recordright{
  text-align: right;
}
.Recordcash{
  color: #8E8E8E;
  font-weight: bold;
  font-size: 10px;
}
.Recordnum{
  font-size: 13px;
}
.Recordmoney{
  color: red;
  font-weight: bold;
  font-size: 12px;
}
.text-box{
  float: left;
  width: calc(100% - 25px);
}
.img-box{
  float: left;
}
.img1{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>

<style>
#Record .el-tabs__nav{
  width: 100% !important;
}
#Record .el-tabs__item {
  width: 50% !important;
  text-align: center;
}
</style>
