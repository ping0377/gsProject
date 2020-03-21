<template>
  <div id="Index">
    <div class="none-sms" :class="smsNum!=''?'hide':''">{{smsNum}}</div>
    <el-card class="box-card">
      <h3 style="margin: 5px 0px 0px 7px; text-align: left;">今日统计</h3>
      <div class="border1">
        <!-- 1 -->
        <el-row :gutter="10" style="padding: 5px;">
          <!-- 1-1 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>新增会员</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{userRgNumber}}人</dd>
              </dl>
            </div>
          </el-col>
          <!-- 1-2 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>快递费</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{resTotal.toFixed(2)}}元</dd>
              </dl>
            </div>
          </el-col>
          <!-- 1-3 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>预约单</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{resNumber}}笔</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
        <!-- 2 -->
        <el-row :gutter="10" style="padding: 5px;">
          <!-- 2-1 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>充值金额</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{dsTotal.toFixed(2)}}元</dd>
              </dl>
            </div>
          </el-col>
          <!-- 2-2 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>充值笔数</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{dsNumber}}笔</dd>
              </dl>
            </div>
          </el-col>
          <!-- 2-3 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span> 消费金额</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{payTotal.toFixed(2)}}元</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
        <!-- 3 -->
        <el-row :gutter="10" style="padding: 5px;">
          <!-- 3-1 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>消费人次</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{payNumber}}人</dd>
              </dl>
            </div>
          </el-col>
          <!-- 3-2 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>缴费金额</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{userUpTotal.toFixed(2)}}元</dd>
              </dl>
            </div>
          </el-col>
          <!-- 3-3 -->
          <el-col :span="8">
            <div>
              <dl class="Text">
                <dd class="Item1">
                  <div class="border">
                    <div class="imgs"><img src="../../../static/img/ccic.png" alt="img" class="img"></div>
                    <div class="infos"><span>缴费人次</span></div>
                  </div>
                </dd>
                <dd class="Item2">{{userUpNumber}}人</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      dsNumber:0, // 充值笔数
      dsTotal:0, // 充值金额
      payNumber:0, // 消费人次
      payTotal:0, // 消费金额
      resNumber:0, // 预约单
      resTotal:0, // 快递费
      userRgNumber:0, // 新增会员
      userUpNumber:0, // 缴费人次
      userUpTotal:0, // 缴费金额
      smsNum:'' //短信条数
    }
  },
  created(){
    if(sessionStorage.getItem("id")){
      this.getData();
    }
  },
  methods:{
    getData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkid = sessionStorage.getItem('id');
      let Statistics = axios.Statistics(OpenId,fkid);
      let zero = 0;
      Statistics.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          if(!!data.smsResidueNumber){
            if(parseInt(data.smsResidueNumber)<=100){
              this.smsNum = '短信余额不足,请尽快充值';
            }
          }
          if(!!data.dsNumber){
            this.dsNumber = parseInt(data.dsNumber);
          }
          if(!!data.dsTotal){
            this.dsTotal = parseFloat(data.dsTotal);
          }
          if(data.payNumber){
            this.payNumber = parseInt(data.payNumber);
          }
          if(!!data.payTotal){
            this.payTotal = parseFloat(data.payTotal);
          }
          if(!!data.resNumber){
            this.resNumber = parseInt(data.resNumber);
          }
          if(!!data.resTotal){
            this.resTotal = parseFloat(data.resTotal);
          }
          if(!!data.userRgNumber){
            this.userRgNumber = parseInt(data.userRgNumber);
          }
          if(!!data.userUpNumber){
            this.userUpNumber = parseInt(data.userUpNumber);
          }
          if(!!data.userUpTotal){
            this.userUpTotal = parseFloat(data.userUpTotal);
          }
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
.box-card{
  width: 96%;
  margin: 0px auto;
}
.border1{
  width: calc(100% - 10px);
  margin: auto;
}
.Text{
  margin-top: 0px;
  margin-bottom: 0px;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.Item1{
  font-size: 14px;
  color: #727377;
}
.Item2{
  font-size: 15px;
  color: #909399;
  font-weight: bold;
}
.img{
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.border{
  overflow: hidden;
  width: 80px;
  margin: auto;
}
.infos,.imgs{
  float: left;
}
.infos{
  margin-left: 5px;
}
.none-sms{
  color: red;
  text-align: center;
  margin-top: 5px;
  font-size: 0.8em;
}
.hide{
  margin-bottom: 5px;
}
</style>
